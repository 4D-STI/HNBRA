import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        console.log('Authorization Header:', authHeader);

        if (!authHeader) {
            console.error('No Authorization Header Provided');
            return false; // Retorna 403 se o cabeçalho não for encontrado
        }

        const [type, credentials] = authHeader.split(' ');

        if (type !== 'Basic' || !credentials) {
            console.error('Invalid Authorization Format');
            return false; // Retorna 403 se o formato do cabeçalho for inválido
        }

        const [username, password] = Buffer.from(credentials, 'base64').toString().split(':');
        console.log('Decoded Username:', username);
        console.log('Decoded Password:', password);

        if (username === 'admin' && password === 'inform@tic@2022') {
            return true;
        } else {
            console.error('Invalid Credentials');
            return false;
        }
    }
}

