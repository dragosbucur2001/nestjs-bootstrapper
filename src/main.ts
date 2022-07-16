import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  await app.listen(process.env.PORT);
}
bootstrap();
