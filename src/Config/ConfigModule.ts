import { Global, Module } from '@nestjs/common';

import { ConfigService } from '@sendByBot/Config/services/ConfigService';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
