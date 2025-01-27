import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { readFileSync } from 'fs';



async function bootstrap() {

  // produção
  // const httpsOptions = {
  //   key: readFileSync('./src/cors/cert/www.hnbra.mb.key'),
  //   cert: readFileSync('./src/cors/cert/www.hnbra.mb.pem')
  // }

  // produção
  // const app = await NestFactory.create(AppModule, { httpsOptions });
  // desenvolvimento
  const app = await NestFactory.create(AppModule);
  // Configura CORS
  app.enableCors({
    origin: [
      "http://localhost:3001",
      "http://hnbra.mb:3000", "http://172.21.44.24:3000",
      "https://hnbra.com", "https://www.hnbra.com", "https://172.21.44.24"
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  // obter porta a partir do .env
  const configService = app.get(ConfigService)
  const API_PORT = configService.get('API_PORT')

  app.useGlobalPipes(new ValidationPipe())


  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(API_PORT || 3002);
}
bootstrap();
