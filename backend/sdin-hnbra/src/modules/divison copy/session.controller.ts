import { Controller, Post, Body, Get } from '@nestjs/common';
import { SessionService } from './session.service';
import { Session } from 'src/repository/models/session.model';

@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) { }

    @Post()
    async create(@Body() createDivision: { idDivision: number, nameSession: string; status: string }): Promise<Session> {
        return this.sessionService.createSession(createDivision.idDivision, createDivision.nameSession, createDivision.status);
    }

    @Get()
    async getAllDivision() {
        return this.sessionService.getDivision();
    }
}
