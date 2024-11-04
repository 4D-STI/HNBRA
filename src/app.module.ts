import { Module } from '@nestjs/common';

// modulo para utilizar variaveis de ambiente
import { ConfigModule } from '@nestjs/config'

// Sequelize
import { SequelizeModule } from '@nestjs/sequelize'

// modulos
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env.dev',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [],
      retryAttempts: Number(process.env.DB_RETRY_ATTEMPTS),
      retryDelay: Number(process.env.DB_RETRY_DELAY),
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
