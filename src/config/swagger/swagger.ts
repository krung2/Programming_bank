import { INestApplication } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setUpSwagger = (app: INestApplication): void => {

  const options = new DocumentBuilder()
    .setTitle('programming bank service')
    .setDescription('make programming bank service')
    .setVersion('0.1')
    .addTag('bank')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);
}