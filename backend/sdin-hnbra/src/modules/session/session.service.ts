import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from 'src/repository/models/session.model';
import { Division } from 'src/repository/models/division.model';
import { UpdateSessionDto } from './dto/update-session';
import { Op } from 'sequelize';
import { SearchSessionDto } from './dto/search-session.dto';


@Injectable()
export class SessionService {
    constructor(
        @InjectModel(Session)
        private readonly sessionRepository: typeof Session,

        @InjectModel(Division)
        private readonly devisionRepository: typeof Division,
    ) { }

    async createSession(idDivision: number, nameSession: string, status: string) {
        console.log("=================", nameSession)
        console.log("=================", status)

        const division = await this.devisionRepository.findOne({
            where: {
                idDivision: idDivision
            },
        });

        if (division === null) {
            throw new BadRequestException(`idDivision: ${idDivision} departamento não encontrado!`);
        }

        return this.sessionRepository.create({ idDivision, nameSession, status });
    }


    async updateSession(updateSessionDto: UpdateSessionDto) {
        if (!updateSessionDto || Object.keys(updateSessionDto).length === 0) {
            throw new BadRequestException('O corpo da requisição não pode estar vazio');
        }
        const division = await this.devisionRepository.findOne({
            where: {
                idDivision: updateSessionDto.idDivision
            },
        });

        if (division === null) {
            throw new BadRequestException(`idDivision: ${updateSessionDto.idDivision} departamento não encontrado!`);
        }

        const session = await this.sessionRepository.findOne({
            where: { idSession: updateSessionDto.idSession }
        });

        if (!session) {
            throw new BadRequestException(
                `Seção/divisão inexistente. idSession: ${updateSessionDto.idSession} não encontrado!`
            );
        }

        console.log('Sessão que será atualizada: ', session);
        console.log('Informações a serem atualizadas: ', updateSessionDto);

        try {
            await this.sessionRepository.update(updateSessionDto, {
                where: { idSession: updateSessionDto.idSession }
            });

            return `Seção/divisão idSession: ${updateSessionDto.idSession} foi atualizada com sucesso!`;
        } catch (e) {
            throw new Error(`Erro ao atualizar sessão: ${e.message}`);
        }
    }




    async searchSession(searchDto: SearchSessionDto): Promise<any> {
        const where: any = {};
        const message = `Seção/divisão inexistente!
    Atributos pesquisados: ${Object.keys(where).map(key => key.toUpperCase())}`

        for (const [key, value] of Object.entries(searchDto)) {
            if (value) {
                where[key] = {
                    [Op.iLike]: `%${value}%`
                };
            }
        }

        const user = await this.sessionRepository.findAll({ where })

        if (user.length === 0) {
            throw new BadRequestException(message)
        }

        return user;
    }




    async getDivision() {
        return this.sessionRepository.findAll();
    }

}
