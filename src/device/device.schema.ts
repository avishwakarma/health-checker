import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceDcument = Device & Document;

export enum DeviceHealth {
  green = 'green',
  orange = 'orange',
  red = 'red',
}

@Schema({
  timestamps: true,
})
export class Device {
  @Prop()
  name: string;

  @Prop({
    type: 'string',
    enum: Object.keys(DeviceHealth),
    default: DeviceHealth.red,
  })
  health: DeviceHealth;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
