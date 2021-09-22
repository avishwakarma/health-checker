import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PingDocument = Ping & Document;

@Schema({
  timestamps: true,
})
export class Ping {
  @Prop()
  deviceId: string;
}

export const PingSchema = SchemaFactory.createForClass(Ping);
