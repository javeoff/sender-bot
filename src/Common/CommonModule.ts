import { Global, Module } from '@nestjs/common';
import { ormProvider } from './providers/ormProvider';
import { ConfigModule } from '../Config/ConfigModule';
import { ListBuilder } from './builders/ListBuilder';

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
