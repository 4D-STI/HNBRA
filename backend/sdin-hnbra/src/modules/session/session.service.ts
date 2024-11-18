import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from 'src/repository/models/session.model';
import { Division } from 'src/repository/models/division.model';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UpdateSessionDto } from './dto/update-session';
import { Op } from 'sequelize';
import { SearchUserDto } from '../users/dto/search-user.dto';


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

    //   async update(updateSessionDTo: UpdateSessionDto) {
    //     // pesquisar nip do usuario antes de atualizar
    //     if (Object.keys(updateSessionDTo).length === 0) {
    //       throw new BadRequestException('O corpo da requisição não pode estar vazio');
    //     }
    //     const user = await this.sessionRepository.findOne({ where: { idSession: updateSessionDTo.idSession } });
    //     if (!user) {
    //       throw new BadRequestException(`Seção/divisão inexistente. idSession: ${updateSessionDTo.idSession} não encontrado!`)
    //     }
    //     const userToUpdate = await this.searchSession({ nip })

    //     console.log('Usuario que sera atualizado: ', userToUpdate);
    //     console.log('Informações a sere, atualizadas: ', updateUserDto);

    //     try {
    //       await this.userRepository.update(updateUserDto, { where: { nip } })
    //     } catch (e) {
    //       throw new Error(`Erro ao atualizar usuário: ${e}`)
    //     }
    //     return `Usuário NIP: ${nip} foi atualizado com sucesso!`;
    //   }



    // async searchSession(searchDto: SearchUserDto): Promise<any> {
    //     const where: any = {};
    //     const message = `Usuário inexistente!
    // Atributos pesquisados: ${Object.keys(where).map(key => key.toUpperCase())}`

    //     // searchDto.status.toUpperCase()

    //     for (const [key, value] of Object.entries(searchDto)) {
    //         if (value) {
    //             where[key] = {
    //                 [Op.iLike]: `%${value}%` // Case-insensitive LIKE comparison
    //             };
    //         }
    //     }

    //     const user = await this.userRepository.findAll({ where })

    //     if (user.length === 0) {
    //         throw new BadRequestException(message)
    //     }

    //     return user;
    // }




    async getDivision() {
        return this.sessionRepository.findAll();
    }

}
