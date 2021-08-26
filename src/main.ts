import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorFilter } from './global/filters/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  const port: number = app.get(ConfigService).get('PORT');
  const options = new DocumentBuilder()
    .setTitle('programming bank service')
    .setDescription('make programming bank service')
    .setVersion('0.1')
    .addTag('bank')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(port);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();