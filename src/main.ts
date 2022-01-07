import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// https://codeburst.io/integrating-swagger-with-nestjs-9650594ab728

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
