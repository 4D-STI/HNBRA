import { HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { Users } from 'src/repository/models/user.model';
import { error } from 'console';
import { UserPermission } from 'src/repository/models/permission.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof Users,
        private readonly jwtService: JwtService,
        @InjectModel(UserPermission)
        private readonly userPermissionModel: typeof UserPermission,
    ) { }

    async findByEmail(emailMb: string): Promise<Users | null> {
        return this.usersRepository.findOne({ where: { emailMb } });
    }

    async validateUser(nip: string, password: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { nip } });
        if (!user) {
            // Usuário não encontrado
            throw new UnauthorizedException('Invalid credentials');
        }


        // Usar await para esperar a resolução da Promise
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            console.log("Login validado com sucesso! id:", user.nip)
            const { password, ...result } = user;
            return result; // Retorna o usuário sem o campo senha
        }
        return null; // Senha inválida
    }


    async login(user: Users) {
        const permissions = await this.userPermissionModel.findAll({
            where: { nip: user.dataValues.nip, status: 'true' },
        });

        const payload = {
            nip: user.dataValues.nip,
            email: user.dataValues.emailPersonal,
            firstName: user.dataValues.firstName,
            lastName: user.dataValues.lastName,
            patent: user.dataValues.idPatent,
            warName: user.dataValues.warName,
            permission: user.dataValues.permission,
            permissionUsers: permissions.map(p => p.idSubSession)
        };

        const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
        return {
            access_token: this.jwtService.sign(payload, { secret: secretKey }),
        };
    }

    async verifyJwt(jwt: string) {
        const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
        try {
            return {
                access_token: this.jwtService.verify(jwt, { secret: secretKey }),
            };
        }
        catch (err) {
            return null;
        }
    }
}
