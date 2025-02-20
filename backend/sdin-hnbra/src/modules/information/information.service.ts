import { Injectable, BadRequestException, Inject, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Information } from 'src/repository/models/information.model';
import { UserPermission } from 'src/repository/models/permission.model';
import { InformationType } from 'src/repository/types/informationType';
import { CreateInformationDTO } from './dto/create-information-dto';
import { Users } from 'src/repository/models/user.model';
import { UpdateInformationDTO } from './dto/update-information-dto';

@Injectable()
export class InformationService {
    constructor(
        @InjectModel(Information)
        private readonly informationModel: typeof Information,
        @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof Users,
    ) { }

    async createInformation(information: CreateInformationDTO, nip: string) {
        const user = await this.usersRepository.findByPk(nip);
        information.nip = user.nip;
        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado!')
        }
        if (user.permission != 'admin') {
            throw new ForbiddenException('O usuário está autenticado, mas não tem permissão para acessar o recurso.')
        }
        return await this.informationModel.create(information);
    }

    async getAllInformation() {
        return await this.informationModel.findAll({ where: { status: 'true' }, order: [['updatedAt', 'DESC']] });
    }

    async updateInformation(information: UpdateInformationDTO, nip: string) {
        const user = await this.usersRepository.findByPk(nip);
        information.nip = user.nip;
        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado!')
        }
        if (user.permission != 'admin') {
            throw new ForbiddenException('O usuário está autenticado, mas não tem permissão para acessar o recurso.')
        }
        try {
            await this.informationModel.update(information, { where: { idInformation: information.idInformation } });
        } catch (e) {
            throw new BadRequestException('Erro ', e)
        }

        return await this.informationModel.findByPk(information.idInformation);
    }

    async deleteInformation(idInformation: number) {
        const information = await this.informationModel.findByPk(idInformation);
        await this.informationModel.destroy({ where: { idInformation: information.idInformation } })
    }

}
