import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDcument } from './device.schema';

@Injectable()
export class DeviceService {
  constructor(@InjectModel(Device.name) private device: Model<DeviceDcument>) {}

  async create(data: any) {
    return this.device.create(new this.device(data));
  }

  async find(filter: any = {}) {
    return this.device.find(filter);
  }

  async findOne(filter: any = {}) {
    return this.device.findOne(filter);
  }

  async findById(id: string) {
    return this.device.findById(id);
  }

  async update(filter: any, data: any) {
    return this.device.update(filter, data);
  }
}
