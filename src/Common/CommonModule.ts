import { ormProvider } from '@sendByBot/Common/providers/ormProvider';
import { ConfigModule } from '@sendByBot/Config/ConfigModule';
import { ListBuilder } from '@sendByBot/Common/builders/ListBuilder';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    ormProvider,
    ListBuilder
  ],
  exports: [
    ormProvider,
    ListBuilder,
  ],
  imports: [ConfigModule],
})
export class CommonModule {}
