// import { Injectable } from '@nestjs/common';  // Adicionando a importação de Injectable
// import { Strategy } from 'passport-jwt';
// import { ExtractJwt } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(private configService: ConfigService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: configService.get('your_jwt_secret_key_here'),
//         });
//     }

//     async validate(payload: any) {
//         return { userId: payload.sub, username: payload.username };
//     }
// }
