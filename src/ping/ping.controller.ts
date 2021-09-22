import { Controller, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { PingService } from './ping.service';

@Controller('ping')
export class PingController {
  constructor(private ping: PingService) {}

  @Get(':deviceId')
  async handlePing(@Req() req: Request) {
    return this.ping.create(req.params.deviceId);
  }
}
