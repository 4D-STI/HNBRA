import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configura CORS
  app.enableCors({
    // origin: ["http://localhost:3001", "http://localhost:80", "http://localhost:3000"]
    origin: ["http://172.21.44.24", "http://172.21.44.24:80", "http://172.21.44.24:3000", "http://172.21.44.24:3001",
      "http://localhost:3001", "http://localhost:3000"
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  // obter porta a partir do .env
  const configService = app.get(ConfigService)
  const API_PORT = configService.get('API_PORT')

  app.useGlobalPipes(new ValidationPipe())


  const config = new DocumentBuilder()
    .setTitle('HNBRA API')
    .setDescription('The HNBRA API description')
    .setVersion('1.0')
    .addBasicAuth({ type: 'http', scheme: 'basic' }, 'basic') // Define o BasicAuth
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
