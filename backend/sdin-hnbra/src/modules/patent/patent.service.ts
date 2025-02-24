import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Patent } from 'src/repository/models/patent.model';
import { Users } from 'src/repository/models/user.model';

@Injectable()
export class PatentService {
    constructor(
        @InjectModel(Patent)
        private readonly patentRepository: typeof Patent,
        @Inject('USERS_REPOSITORY') private readonly userRepository: typeof Users,
    ) { }


    async getPatent() {
        return await this.patentRepository.findAll({ order: [['idPatent', 'DESC']] });
    }

    async putPatent(patent: Patent) {
        try {
            this.patentRepository.update(patent, { where: { idPatent: patent.idPatent } });
        } catch (e) {
            throw new Error(`Erro ao atualizar Posto/Grad: ${e}`)
        }
        return this.patentRepository.findByPk(patent.idPatent);
    }

    async createPatent(patent: Patent, nip: string) {
        const user = await this.userRepository.findByPk(nip);
        if (!user) {
            throw new BadRequestException('Usuário não encontrado!')
        }
        if (user.permission != 'admin') {
            throw new BadRequestException('Usuário sem permissão!')
        }
        try {
            const allPatent = await this.patentRepository.findOne({ where: { patent: patent.patent } });
            if (allPatent) {
                throw new BadRequestException('Patente ja existente!');
            }
            return await this.patentRepository.create(patent);
        }
        catch (e) {
            throw new BadRequestException('Erro ao criar patente ', e);
        }

    }

    async deletePatent(idPatent: number, nip: string) {
        const user = await this.userRepository.findByPk(nip);
        if (!user) {
            throw new BadRequestException('Usuário não encontrado!')
        }
        if (user.permission != 'admin') {
            throw new BadRequestException('Usuário sem permissão.')
        }
        try {
            const patent = await this.patentRepository.findByPk(idPatent);
            if (!patent) {
                throw new BadRequestException('Patente não encontrada!');
            }
            const deleted = await this.patentRepository.destroy({ where: { idPatent: patent.idPatent } });
            if (!deleted) {
                throw new BadRequestException('Erro ao deletar patent');
            }
            return { message: 'Patente deletada com sucesso!' }
        }
        catch (e) {
            throw new BadRequestException('Erro ao deletar patente ', e);
        }
    }
}
