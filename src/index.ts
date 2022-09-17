import { AppModule } from './AppModule';
import { NestFactory } from '@nestjs/core';
import { BotExceptionFilter } from './Error/filters/BotExceptionFilter';
import { LoggerService } from './Logger/services/LoggerService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = await app.resolve(LoggerService);

  app.useGlobalFilters(new BotExceptionFilter(logger));
  await app.listen(3000);
}

void bootstrap();
