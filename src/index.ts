import { AppModule } from './AppModule';
import { NestFactory } from '@nestjs/core';
import { loadDotenv } from './Common/utils/loadDotenv';

async function bootstrap() {
  loadDotenv();
  await NestFactory.createApplicationContext(AppModule);
}

void bootstrap();
