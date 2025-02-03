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
    allowedHeaders: ['Content-Type, Accept', 'Authorization']
  });
  // obter porta a partir do .env
  const configService = app.get(ConfigService)
  const API_PORT = configService.get('API_PORT')

  app.useGlobalPipes(new ValidationPipe())


  const config = new DocumentBuilder()
    .setTitle('HNBRA API')
    .setDescription('The HNBRA API description')
    .setVersion('1.0')
    // .addBasicAuth({ type: 'http', scheme: 'basic' }, 'basic') // Define o BasicAuth
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Opcional, apenas para visualização
      },
      'JWT-auth', // Nome da referência para segurança
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(API_PORT || 3002);
}
bootstrap();
