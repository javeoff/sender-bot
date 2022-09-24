import { Global, Module } from '@nestjs/common';

import { IsSubscribedGuard } from '@sendByBot/Common/guards/IsSubscriberGuard';
import { ormProvider } from '@sendByBot/Common/providers/ormProvider';
import { ListBuilder } from '@sendByBot/Common/utils/builders/ListBuilder';
import { ConfigModule } from '@sendByBot/Config/ConfigModule';

@Global()
@Module({
  providers: [ormProvider, ListBuilder, IsSubscribedGuard],
  exports: [ormProvider, ListBuilder],
  imports: [ConfigModule],
})
export class CommonModule {}
