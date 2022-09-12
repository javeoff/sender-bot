import { Module } from '@nestjs/common';
import { ConfigService } from './services/ConfigService';

@Module({
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
