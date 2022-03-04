import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// changes
// https://codeburst.io/integrating-swagger-with-nestjs-9650594ab728

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const APP_NAME = process.env.APP_NAME;
  const APP_VERSION = process.env.APP_VERSION;
  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`The ${APP_NAME} API description`)
    .setVersion(APP_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
