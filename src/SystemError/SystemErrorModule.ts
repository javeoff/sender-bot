import { Global, Module } from '@nestjs/common';

import { SystemErrorFactory } from '@sendByBot/SystemError/factories/SystemErrorFactory';

@Global()
@Module({
  providers: [SystemErrorFactory],
  exports: [SystemErrorFactory],
})
export class SystemErrorModule {}
