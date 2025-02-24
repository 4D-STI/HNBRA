import { Injectable } from '@nestjs/common';  // Adicionando a importação de Injectable
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
    }

    async validate(payload: any) {
        return {
            nip: payload.nip,
            email: payload.email,
            firstName: payload.firstName,
            lastName: payload.lastName,
            patent: payload.patent,
            warName: payload.warName,
            permission: payload.permission,
        };
    }
}