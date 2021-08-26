import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  const port: number = app.get(ConfigService).get('PORT');
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();