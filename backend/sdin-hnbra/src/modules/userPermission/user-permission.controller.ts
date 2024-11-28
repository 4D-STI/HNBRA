import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserPermissionService } from './user-permission.service';
import { CreateUserPermissionDTO } from './dto/create-user-permission-dto';
import { UserPermission } from 'src/repository/models/permission.model';

@Controller('user-permission')
export class UserPermissionController {
    constructor(private readonly userPermissionService: UserPermissionService) { }

    @Post()
    async create(@Body() createDivision: CreateUserPermissionDTO): Promise<UserPermission> {
        return this.userPermissionService.createUserPermission(createDivision);
    }

    // @Get()
    // async getAllDivision() {
    //     return this.userPermissionService.getDivision();
    // }
}
