import { Controller, Post, Body, Get, Put, BadRequestException } from '@nestjs/common';
import { SubSessionService } from './sub-session.service';
import { CreateSubSessionDto } from './dto/create-sub-session';
import { SubSession } from 'src/repository/models/subSession.model ';
import { UpdateSubSessionDto } from './dto/update-sub-session';

@Controller('subSession')
export class SubSessionController {
    constructor(private readonly subSessionService: SubSessionService) { }

    @Post()
    async createSession(@Body() createSubSession: CreateSubSessionDto): Promise<SubSession> {
        return this.subSessionService.createSubSession(createSubSession.idSession, createSubSession.nameSubSession, createSubSession.status);
    }

    @Get()
    async getAllSubSession() {
        return this.subSessionService.getSubSession();
    }

    @Put()
    async updateSession(@Body() updateSubSessionDto: UpdateSubSessionDto) {
        try {
            const updatedSubSession = await this.subSessionService.updateSubSession(updateSubSessionDto);
            return {
                // message: 'Sessão atualizada com sucesso!',
                message: updatedSubSession,
            };
        } catch (error) {
            throw new BadRequestException(error.message || 'Erro ao atualizar subSessão.');
        }
    }

}
