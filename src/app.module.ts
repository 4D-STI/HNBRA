import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Config
import { ConfigModule } from '@nestjs/config'

// Sequelize
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      models: [],
      retryAttempts: 5,
      retryDelay: 3000,
      autoLoadModels: true,
      synchronize: true
    }),
    ConfigModule.forRoot({
      envFilePath: '../../dev.env'
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
