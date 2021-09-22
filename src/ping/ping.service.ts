import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { differenceInSeconds } from 'date-fns';
import { DeviceService } from '../device/device.service';
import { Ping, PingDocument } from './ping.schema';

@Injectable()
export class PingService {
  constructor(
    @InjectModel(Ping.name) private ping: Model<PingDocument>,
    private device: DeviceService,
  ) {}

  async create(deviceId: string) {
    try {
      const device: any = await this.device.findById(deviceId);

      if (!device) {
        throw new HttpException('Device not found.', 404);
      }
    } catch {
      throw new HttpException('Device not found.', 404);
    }

    await this.updateDeviceHealth(deviceId);

    return this.ping.create(
      new this.ping({
        deviceId,
      }),
    );
  }

  async updateDeviceHealth(deviceId: string): Promise<void> {
    const pings: any = await this.ping
      .find({
        deviceId,
      })
      .sort({ createdAt: -1 })
      .limit(15)
      .exec();

    const now = new Date();
    const pingMap = [0, 0, 0];

    pings.forEach((ping: any) => {
      const diff: number = differenceInSeconds(new Date(ping.createdAt), now);
      if (diff > 120) {
        pingMap[2] = ++pingMap[2];
      } else if (diff > 60 && diff <= 120) {
        pingMap[1] = ++pingMap[1];
      } else if (diff <= 60) {
        pingMap[0] = ++pingMap[0];
      }
    });

    let isGreen = false;

    pingMap.forEach((count: number) => {
      isGreen = count >= 3 ? true : false;
    });

    await this.device.update(
      {
        _id: deviceId,
      },
      {
        health: isGreen ? 'green' : 'red',
      },
    );
  }
}
