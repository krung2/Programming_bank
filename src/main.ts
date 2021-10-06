import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorFilter } from './global/filters/error.filter';
import { setUpSwagger } from './config/swagger/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, { cors: false });
  const port: number = app.get(ConfigService).get('PORT');
  setUpSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorFilter());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'views'));
  app.setViewEngine('html');
  await app.listen(port);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();