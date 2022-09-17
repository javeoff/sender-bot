import { Global, Module } from '@nestjs/common';

import { ListBuilder } from '@sendByBot/Common/builders/ListBuilder';
import { ormProvider } from '@sendByBot/Common/providers/ormProvider';
import { ConfigModule } from '@sendByBot/Config/ConfigModule';

@Global()
@Module({
  providers: [ormProvider, ListBuilder],
  exports: [ormProvider, ListBuilder],
  imports: [ConfigModule],
})
export class CommonModule {}
