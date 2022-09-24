import { NestFactory } from '@nestjs/core';

import { AppModule } from './AppModule';
import { BotExceptionFilter } from './Error/filters/BotExceptionFilter';
import { LoggerService } from './Logger/services/LoggerService';
import { IsSubscribedGuard } from '@sendByBot/Common/guards/IsSubscriberGuard';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const logger = await app.resolve(LoggerService);

  app.useGlobalFilters(new BotExceptionFilter(logger));
  app.useGlobalGuards(new IsSubscribedGuard());

  await app.listen(3_000);
}

void bootstrap();
