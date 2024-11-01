import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // obter porta a partir do .env
  const configService = app.get(ConfigService)
  const API_PORT = configService.get('API_PORT')

  await app.listen(API_PORT);
}
bootstrap();
