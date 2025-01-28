import { HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { Users } from 'src/repository/models/user.model';
import { error } from 'console';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof Users,
        private readonly jwtService: JwtService,
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


    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
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
