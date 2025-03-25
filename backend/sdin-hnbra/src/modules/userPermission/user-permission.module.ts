import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserPermissionService } from './user-permission.service';
import { UserPermissionController } from './user-permission.controller';
import { UserPermission } from 'src/repository/models/permission.model';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [SequelizeModule.forFeature([UserPermission]), UsersModule],
    controllers: [UserPermissionController],
    providers: [UserPermissionService],
    exports: [SequelizeModule],
})
export class UserPermissionModule { }
