import { Module } from '@nestjs/common';
import { EncodingService } from './services/EncodingService';
import { ConfigModule } from '../Config/ConfigModule';

@Module({
  providers: [EncodingService],
  exports: [EncodingService],
  imports: [ConfigModule],
})
export class EncodingModule {}
