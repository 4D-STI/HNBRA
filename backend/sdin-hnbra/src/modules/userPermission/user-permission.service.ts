import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserPermissionDTO } from './dto/create-user-permission-dto';
import { UserPermission } from 'src/repository/models/permission.model';

@Injectable()
export class UserPermissionService {
    constructor(
        @InjectModel(UserPermission)
        private readonly userPermissionService: typeof UserPermission,
    ) { }

    async createUserPermission(create: CreateUserPermissionDTO) {

        try {
            return await this.userPermissionService.create(create);
        } catch (error) {
            console.error("Erro ao criar divisão:", error);
            throw new BadRequestException('Erro ao criar divisão', error);
        }
    }

    async gealAllPermission() {
        return this.userPermissionService.findAll();
    }

    // async getDivision() {
    //     return this.divisionModel.findAll();
    // }

}
