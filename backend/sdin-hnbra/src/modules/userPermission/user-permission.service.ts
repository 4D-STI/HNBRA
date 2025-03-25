import { Injectable, BadRequestException, Inject, UnauthorizedException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserPermissionDTO } from './dto/create-user-permission-dto';
import { UserPermission } from 'src/repository/models/permission.model';
import { UserPermissionType } from 'src/repository/types/userPermissionType ';
import { Users } from 'src/repository/models/user.model';
import { SubSession } from 'src/repository/models/subSession.model ';

@Injectable()
export class UserPermissionService {
    constructor(
        @InjectModel(UserPermission)
        private readonly userPermissionModel: typeof UserPermission,
        @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof Users,
    ) { }

    async createUserPermission(create: CreateUserPermissionDTO, nip: string) {
        const user = await this.usersRepository.findByPk(nip);
        if (user.permission !== 'admin') {
            throw new ForbiddenException("Usuario não tem permissão para conceder acessos!");
        }
        const permission = await this.userPermissionModel.findOne({ where: { nip: user.nip, status: 'true', idSubSession: create.idSubSession } });
        if (permission) {
            throw new ConflictException("Permissão ja concedida anteriormente!")
        }
        if (!create.idSubSession) {
            throw new BadRequestException("Erro")
        }
        try {
            return await this.userPermissionModel.create(create);
        } catch (error) {
            console.error("Erro ao criar permissão:", error);
            throw new BadRequestException('Erro ao criar permissão', error);
        }
    }

    async getAllPermission() {
        return this.userPermissionModel.findAll();
    }

    async getAllPermissionNip(nip: string) {
        // const user = await this.userPermissionModel.findOne({ where: { nip: nip } })
        // if (!user) {
        //     throw new BadRequestException('não foram encontrados permissão para esse nip');
        // }
        try {
            return this.userPermissionModel.findAll({
                where: { nip: nip },
                include: [
                    {
                        model: SubSession,
                        attributes: ['nameSubSession']
                    }
                ]
            })
        }
        catch (e) {
            throw new BadRequestException('não foram encontrados permissão para esse nip ', e);
        }
    }

    async updatePermission(userPermission: UserPermissionType, nip: string) {
        const user = await this.usersRepository.findByPk(nip);
        if (user.permission !== 'admin') {
            throw new ForbiddenException("Usuario não tem permissão para conceder acessos!");
        }
        const userPermissionOld = await this.userPermissionModel.findByPk(userPermission.idPermission);
        if (!userPermissionOld) {
            throw new BadRequestException('Não encontrado permissão para o usuário!');
        }

        const updatedPermission = {
            idSubSession: userPermission.idSubSession ?? userPermissionOld.idSubSession,
            nip: userPermission.nip ?? userPermissionOld.nip,
            permission: userPermission.permission ?? userPermissionOld.permission,
            status: userPermission.status ?? userPermissionOld.status,
        };
        try {
            await this.userPermissionModel.update(updatedPermission, { where: { idPermission: userPermission.idPermission } });
        }
        catch (e) {
            throw new BadRequestException('erro ao atualizar permissão: ', e.message);
        }

        return await this.userPermissionModel.findByPk(userPermission.idPermission);

    }

    async deletePermission(idPermission: number, nip: string) {
        const user = await this.usersRepository.findByPk(nip);
        if (user.permission !== 'admin') {
            throw new ForbiddenException("Usuario não tem permissão para conceder acessos!");
        }
        const permission = await this.userPermissionModel.findByPk(idPermission);
        if (!permission) {
            throw new BadRequestException('Permissão não encontrada!');
        }
        try {
            await this.userPermissionModel.destroy({ where: { idPermission } });
        } catch (e) {
            throw new BadRequestException('Erro ao deleltar permissão ', e);
        }
        return { message: 'Permissão deletada' }
    }

    // async getDivision() {
    //     return this.divisionModel.findAll();
    // }

}
