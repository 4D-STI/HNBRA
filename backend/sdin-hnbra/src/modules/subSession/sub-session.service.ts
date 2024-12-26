import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { literal } from 'sequelize';
import { SubSession } from 'src/repository/models/subSession.model ';
import { Session } from 'src/repository/models/session.model';
import { UpdateSubSessionDto } from './dto/update-sub-session';



@Injectable()
export class SubSessionService {
    constructor(
        @InjectModel(SubSession)
        private readonly subSessionRepository: typeof SubSession,

        @InjectModel(Session)
        private readonly sessionRepository: typeof Session,
    ) { }

    removeAccents(str: string): string {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[çÇ]/g, 'c')
            .replace(/ /g, "_");
    }

    async createSubSession(idSession: number, nameSubSession: string, status: string) {
        // nameSubSession = Buffer.from(nameSubSession, 'latin1').toString('utf8');
        // nameSubSession = this.removeAccents(nameSubSession)

        const session = await this.sessionRepository.findOne({
            where: {
                idSession: idSession
            },
        });
        const subSessionExist = await this.subSessionRepository.findOne({
            where: {
                nameSubSession: nameSubSession,
                idSession: idSession, // Adiciona a condição do idSession
            }
        });
        console.log(subSessionExist);
        if (subSessionExist) {
            throw new BadRequestException(`nameSubSession: ${nameSubSession} já está cadastrado para a mesma seção!`);
        }


        if (session === null) {
            throw new BadRequestException(`idSession: ${idSession} seção/divisão não encontrado!`);
        }

        return this.subSessionRepository.create({ idSession, nameSubSession, status });
    }


    async updateSubSession(updateSubSessionDto: UpdateSubSessionDto) {
        // updateSubSessionDto.nameSubSession = Buffer.from(updateSubSessionDto.nameSubSession, 'latin1').toString('utf8');
        // updateSubSessionDto.nameSubSession = this.removeAccents(updateSubSessionDto.nameSubSession)
        if (!updateSubSessionDto || Object.keys(updateSubSessionDto).length === 0) {
            throw new BadRequestException('O corpo da requisição não pode estar vazio');
        }
        const sessionUpDate = await this.sessionRepository.findOne({
            where: {
                idSession: updateSubSessionDto.idSession
            },
        });
        const subSessionExist = await this.subSessionRepository.findOne({
            where: {
                nameSubSession: updateSubSessionDto.nameSubSession,
                idSession: updateSubSessionDto.idSession,
            }
        });
        console.log(subSessionExist);
        if (subSessionExist) {
            throw new BadRequestException(`nameSubSession: ${updateSubSessionDto.nameSubSession} já está cadastrado para a mesma seção!`);
        }

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




    async searchSession(idSession: number): Promise<any> {
        const where: any = {};
        const message = `SubSeção inexistente!
    Atributos pesquisados: ${Object.keys(where).map(key => key.toUpperCase())}`

        const user = await this.subSessionRepository.findAll({ where: { idSession: idSession, status: 'active' }, order: [[literal(`SUBSTRING(REPLACE("nameSubSession",' ', ''), 1, 7)`), 'ASC']] })

        if (user.length === 0) {
            throw new BadRequestException(message)
        }

        return user;
    }


    async getSubSession() {
        return this.subSessionRepository.findAll({ where: { status: "active" }, order: [['nameSubSession', 'ASC']], });
    }

}
