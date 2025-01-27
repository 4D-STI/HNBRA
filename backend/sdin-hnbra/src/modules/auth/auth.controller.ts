import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                nip: { type: 'string' },
                password: { type: 'string' },
            },
        },
    })
    // async login(@Body() body: { email: string; password: string }) {
    async login(@Body('nip') nip: string,
        @Body('password') password: string) {
        const user = await this.authService.validateUser(nip, password);
        if (!user) {
            throw new UnauthorizedException('E-mail ou senha inválidos');
        }
        return this.authService.login(user);
    }
}
