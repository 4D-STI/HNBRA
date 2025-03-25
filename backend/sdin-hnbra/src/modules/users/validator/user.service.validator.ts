import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from 'bcryptjs';
import { Op } from "sequelize";
import { Patent } from "src/repository/models/patent.model";
import { Users } from "src/repository/models/user.model";
import { UpdateUserDto } from "../dto/update-user.dto";
import { CreateUserDtoResponse } from "../dto/create-user-response.dto";

@Injectable()
export class UsersValidator {
    constructor(@InjectModel(Users) private readonly userRepository: typeof Users,
        @InjectModel(Patent)
        private readonly patentRepository: typeof Patent,) { }

    async validateCreateUser(createUserDto: any) {
        const user = await this.userRepository.findOne({
            where: {
                [Op.or]: [
                    { nip: createUserDto.nip },
                    { emailPersonal: createUserDto.emailPersonal },
                    { emailMb: createUserDto.emailMb },
                ],
            },
        });

        if (user) {
            if (user.nip === createUserDto.nip) {
                throw new BadRequestException(`NIP: ${createUserDto.nip} já está cadastrado!`);
            }
            if (user.emailPersonal === createUserDto.emailPersonal) {
                throw new BadRequestException(`emailPessoa: ${createUserDto.emailPersonal} já está cadastrado!`);
            }
            if (user.emailMb === createUserDto.emailMb) {
                throw new BadRequestException(`emailMb: ${createUserDto.emailMb} já está cadastrado!`);
            }
        }
    }

    validateLoginData(nip: string, password: string) {
        if (!nip || !password) {
            throw new BadRequestException('Login e senha são obrigatórios.');
        }
    }

    async passwordHash(password: string) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async findByNip(nip: string): Promise<Users | null> {
        return this.userRepository.findOne({ where: { nip } });
    }

    async valdiateUpdate(nip: string, update: UpdateUserDto) {
        if (Object.keys(update).length === 0) {
            throw new BadRequestException('O corpo da requisição não pode estar vazio');
        }
        const user = await this.userRepository.findOne({ where: { nip } });
        if (!user) {
            throw new BadRequestException(`Usuário inexistente. NIP: ${nip} não encontrado!`)
        }

    }

    async createUserResponse(createUserDto: Users): Promise<CreateUserDtoResponse> {
        // Busca os dados do usuário e da patente em paralelo para otimizar performance
        const [user, patent] = await Promise.all([
            this.userRepository.findOne({ where: { nip: createUserDto.nip } }),
            this.patentRepository.findOne({ where: { idPatent: createUserDto.idPatent } }),
        ]);

        // Monta a resposta com os dados obtidos
        const response: CreateUserDtoResponse = {
            nip: user?.nip || null,
            patent: patent?.patent || null,
            warName: user?.warName || null,
            firstName: user?.firstName || null,
            lastName: user?.lastName || null,
            role: user?.role || null,
            status: user?.status || null,
            permission: user?.permission || null,
            password: user?.password || null,
            emailPersonal: user?.emailPersonal || null,
            emailMb: user?.emailMb || null,
            contactNumber: user?.contactNumber || null,
        };

        return response;
    }
}