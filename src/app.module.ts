import { Module } from '@nestjs/common';

// modulo para utilizar variaveis de ambiente
import { ConfigModule } from '@nestjs/config'

// Sequelize
import { SequelizeModule } from '@nestjs/sequelize'

// modulos
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { usersModule } from './modules/users/users.module';
import { users } from './repository/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env.dev',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3001,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE_DEV || 'sdin-hnbra-dev',
      models: [users],
      retryAttempts: Number(process.env.DB_RETRY_ATTEMPTS) || 5,
      retryDelay: Number(process.env.DB_RETRY_DELAY) || 1000,
      autoLoadModels: true,
      synchronize: true,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000, // 30 segundos; tempo maximo para aquisição
        idle: 10000, // 10 segundos; tempo maximo de inatividade
      }
    }),
    usersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
