import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { users } from 'src/repository/models/user.model';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof users,
        private readonly jwtService: JwtService,
    ) { }

    async findByEmail(emailMb: string): Promise<users | null> {
        return this.usersRepository.findOne({ where: { emailMb } });
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.findByEmail(email);
        if (!user) {
            // Usuário não encontrado
            throw new UnauthorizedException('Invalid credentials');
        }

        console.log("====================", user.password)
        console.log("====================", password)

        // Usar await para esperar a resolução da Promise
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("====================", isPasswordValid);

        if (isPasswordValid) {
            console.log("Login validado com sucesso!")
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
}
