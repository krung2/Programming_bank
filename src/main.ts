import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorFilter } from './global/filters/error.filter';
import { setUpSwagger } from './config/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  const port: number = app.get(ConfigService).get('PORT');
  setUpSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(port);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();