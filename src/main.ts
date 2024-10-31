// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3001);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sequelizeInstance = app.get(Sequelize);

  await sequelizeInstance.sync(); // Sincroniza os models com o banco de dados
  await app.listen(3001);
}
bootstrap();
