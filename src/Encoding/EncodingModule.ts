import { Module } from '@nestjs/common';
import { EncodingService } from '@sendByBot/Encoding/services/EncodingService';
import { ConfigModule } from '@sendByBot/Config/ConfigModule';

@Module({
  providers: [EncodingService],
  exports: [EncodingService],
  imports: [ConfigModule],
})
export class EncodingModule {}
