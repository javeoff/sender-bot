import { AppModule } from './AppModule';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule);
}

void bootstrap();
