
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.provider';
import { DatabaseModule } from '../../bd/db.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patent } from 'src/repository/models/patent.model';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([Patent])],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
  ],
  exports: [
    UsersService,
    ...usersProviders,

  ],
})

export class UsersModule { }
