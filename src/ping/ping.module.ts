import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ping, PingSchema } from './ping.schema';
import { PingService } from './ping.service';
import { PingController } from './ping.controller';
import { DeviceModule } from 'src/device/device.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ping.name,
        schema: PingSchema,
      },
    ]),
    DeviceModule,
  ],
  providers: [PingService],
  controllers: [PingController],
})
export class PingModule {}
