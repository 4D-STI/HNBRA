import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { SubSession } from 'src/repository/models/subSession.model ';
import { Session } from 'src/repository/models/session.model';
import { UpdateSubSessionDto } from './dto/update-sub-session';
import { SearchSubSessionDto } from './dto/search-sub-session.dto';



@Injectable()
export class SubSessionService {
    constructor(
        @InjectModel(SubSession)
        private readonly subSessionRepository: typeof SubSession,

        @InjectModel(Session)
        private readonly sessionRepository: typeof Session,
    ) { }

    async createSubSession(idSession: number, nameSubSession: string, status: string) {
        console.log("=================", nameSubSession)
        console.log("=================", status)

        const session = await this.sessionRepository.findOne({
            where: {
                idSession: idSession
            },
        });

        if (session === null) {
            throw new BadRequestException(`idSession: ${idSession} seção/divisão não encontrado!`);
        }

        return this.subSessionRepository.create({ idSession, nameSubSession, status });
    }


    async updateSubSession(updateSubSessionDto: UpdateSubSessionDto) {
        if (!updateSubSessionDto || Object.keys(updateSubSessionDto).length === 0) {
            throw new BadRequestException('O corpo da requisição não pode estar vazio');
        }
        const sessionUpDate = await this.sessionRepository.findOne({
            where: {
                idSession: updateSubSessionDto.idSession
            },
        });

        if (sessionUpDate === null) {
            throw new BadRequestException(`idSession: ${updateSubSessionDto.idSubSession} departamento não encontrado!`);
        }

        const subSession = await this.subSessionRepository.findOne({
            where: { idSubSession: updateSubSessionDto.idSubSession }
        });

        if (!subSession) {
            throw new BadRequestException(
                `SubSeção inexistente. idSubSession: ${updateSubSessionDto.idSubSession} não encontrado!`
            );
        }

        console.log('Sessão que será atualizada: ', subSession);
        console.log('Informações a serem atualizadas: ', updateSubSessionDto);

        try {
            await this.subSessionRepository.update(updateSubSessionDto, {
                where: { idSubSession: updateSubSessionDto.idSubSession }
            });

            return `SubSeção idSubSession: ${updateSubSessionDto.idSession} foi atualizada com sucesso!`;
        } catch (e) {
            throw new Error(`Erro ao atualizar subSessão: ${e.message}`);
        }
    }




    async searchSession(searchDto: SearchSubSessionDto): Promise<any> {
        const where: any = {};
        const message = `SubSeção inexistente!
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


    async getSubSession() {
        return this.subSessionRepository.findAll();
    }

}
