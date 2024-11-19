
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.provider';
import { DatabaseModule } from '../../bd/db.module';
import { UsersRepository } from './users.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
    UsersRepository,
  ],
  exports: [
    UsersService, // Exporte o UsersService para uso em outros módulos
    ...usersProviders, // Exporte o USERS_REPOSITORY para uso em outros módulos
    UsersRepository,
  ],
})

export class usersModule { }
