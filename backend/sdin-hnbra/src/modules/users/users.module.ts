
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.provider';
import { DatabaseModule } from '../../bd/db.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patent } from 'src/repository/models/patent.model';
import { UsersValidator } from './validator/user.service.validator';
import { Users } from 'src/repository/models/user.model';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([Users, Patent])],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
    UsersValidator,
  ],
  exports: [
    UsersService,
    ...usersProviders,

  ],
})

export class UsersModule { }
