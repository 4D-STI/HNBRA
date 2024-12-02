import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserPermissionService } from './user-permission.service';
import { UserPermissionController } from './user-permission.controller';
import { UserPermission } from 'src/repository/models/permission.model';

@Module({
    imports: [SequelizeModule.forFeature([UserPermission])],
    controllers: [UserPermissionController],
    providers: [UserPermissionService],
    exports: [SequelizeModule],
})
export class UserPermissionModule { }
