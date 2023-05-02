import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  })
  await app.listen(8080);
  Logger.log("Running on port 8080", "NestApplication")
}
bootstrap();
