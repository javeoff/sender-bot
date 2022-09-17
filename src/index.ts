import { AppModule } from './AppModule';
import { NestFactory } from '@nestjs/core';
import { BotExceptionFilter } from './Error/filters/BotExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new BotExceptionFilter());
  await app.listen(3000);
}

void bootstrap();
