import { Module } from '@nestjs/common';

// modulo para utilizar variaveis de ambiente
import { ConfigModule } from '@nestjs/config'

// Sequelize
import { SequelizeModule } from '@nestjs/sequelize'

// modulos
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { Users } from './repository/models/user.model';
import { DivisionModule } from './modules/divison/division.module';
import { SessionModule } from './modules/session/session.module';
import { Division } from './repository/models/division.model';
import { Session } from './repository/models/session.model';
import { AuthModule } from './modules/auth/auth.module';
import { SubSessionModule } from './modules/SubSession/sub-session.module';
import { FileModule } from './modules/file/file.module';
import { PatentModule } from './modules/patent/patent.module';
import { UserPermissionModule } from './modules/userPermission/user-permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env.dev',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE_DEV || 'sdin-hnbra-dev',
      models: [Users, Division, Session],
      retryAttempts: Number(process.env.DB_RETRY_ATTEMPTS) || 5,
      retryDelay: Number(process.env.DB_RETRY_DELAY) || 1000,
      autoLoadModels: true,
      synchronize: true,
      pool: {
        max: 2,
        min: 0,
        acquire: 30000, // 30 segundos; tempo maximo para aquisição
        idle: 10000, // 10 segundos; tempo maximo de inatividade
      }
    }),
    UsersModule,
    DivisionModule,
    SessionModule,
    AuthModule,
    SubSessionModule,
    FileModule,
    PatentModule,
    UserPermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
