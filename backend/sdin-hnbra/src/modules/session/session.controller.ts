import { Controller, Post, Body, Get, Put, BadRequestException, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { Session } from 'src/repository/models/session.model';
import { CreateSessionDto } from './dto/create-session';
import { UpdateSessionDto } from './dto/update-session';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('session')
@ApiBearerAuth('JWT-auth')
export class SessionController {
    constructor(private readonly sessionService: SessionService) { }

    @Post()
    async createSession(@Body() createDivision: CreateSessionDto): Promise<Session> {
        return this.sessionService.createSession(createDivision.idDivision, createDivision.nameSession, createDivision.status);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllSession() {
        return this.sessionService.getSession();
    }
    @Put()
    async updateSession(@Body() updateSessionDto: UpdateSessionDto) {
        try {
            const updatedSession = await this.sessionService.updateSession(updateSessionDto);
            return {
                // message: 'Sessão atualizada com sucesso!',
                message: updatedSession,
            };
        } catch (error) {
            throw new BadRequestException(error.message || 'Erro ao atualizar sessão.');
        }
    }

}
