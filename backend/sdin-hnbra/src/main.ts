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
    origin: ["http://172.21.44.24", "http://hnbra.mb", "http://172.21.44.24:80", "http://172.21.44.24:3000", "http://172.21.44.24:3001",
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
