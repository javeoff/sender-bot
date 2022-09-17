import { Module } from '@nestjs/common';

import { ConfigModule } from '@sendByBot/Config/ConfigModule';
import { EncodingService } from '@sendByBot/Encoding/services/EncodingService';

@Module({
  providers: [EncodingService],
  exports: [EncodingService],
  imports: [ConfigModule],
})
export class EncodingModule {}
