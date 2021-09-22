import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host: string = config.get('DB_HOST') || 'localhost';
        const port: number = config.get('DB_PORT') || 27017;
        const user: string = config.get('DB_USER') || 'admin';
        const password: string = config.get('DB_PASSWORD') || '';
        const authSource: string = config.get('DB_AUTH_SOURCE') || 'admin';
        const database: string = config.get('DB_NAME') || 'health-checker';

        return {
          uri: `mongodb://${user}:${encodeURIComponent(
            password,
          )}@${host}:${port}/${database}?authSource=${authSource}&ssl=false`,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
