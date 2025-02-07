import { Controller, Post, Body, UnauthorizedException, Req, HttpStatus } from '@nestjs/common';
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
            throw new UnauthorizedException('Nip ou senha inválidos');
        }
        return this.authService.login(user);
    }

    @Post('verifyJwt')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                jwt: { type: 'string' }
            },
        },
    })
    // async login(@Body() body: { email: string; password: string }) {
    async verifyJwt(@Body('jwt') jwt: string) {
        const jwtV = await this.authService.verifyJwt(jwt);
        if (!jwtV) {
            throw new UnauthorizedException('Jwt Inválido!');
        }
        return HttpStatus.OK;
    }
}
