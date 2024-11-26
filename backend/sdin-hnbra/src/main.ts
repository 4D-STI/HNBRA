import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configura CORS
  app.enableCors({
    origin: "http://localhost:3000"
  });
  // obter porta a partir do .env
  const configService = app.get(ConfigService)
  const API_PORT = configService.get('API_PORT')

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(API_PORT || 3002);
}
bootstrap();
