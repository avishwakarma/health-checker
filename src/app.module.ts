import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DeviceModule } from './device/device.module';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: resolve(__dirname, '../.env'),
    }),
    DatabaseModule,
    DeviceModule,
    PingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
