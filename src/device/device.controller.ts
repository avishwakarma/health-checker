import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { DeviceService } from './device.service';

@Controller('devices')
export class DeviceController {
  constructor(private device: DeviceService) {}

  @Get()
  async all() {
    return this.device.find();
  }

  @Post()
  async create(@Req() req: Request) {
    return this.device.create(req.body);
  }

  @Get(':id')
  async one(@Req() req: Request) {
    return this.device.findById(req.params.id);
  }
}
