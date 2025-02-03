import { Controller, Post, Body, Get, Put, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { SubSessionService } from './sub-session.service';
import { CreateSubSessionDto } from './dto/create-sub-session';
import { SubSession } from 'src/repository/models/subSession.model ';
import { UpdateSubSessionDto } from './dto/update-sub-session';
import { BasicAuthGuard } from 'src/config/basicAuth';
import { ApiBasicAuth } from '@nestjs/swagger';

@Controller('subSession')
@ApiBasicAuth('basic')
export class SubSessionController {
    constructor(private readonly subSessionService: SubSessionService) { }

    @Post()
    async createSession(@Body() createSubSession: CreateSubSessionDto): Promise<SubSession> {
        return this.subSessionService.createSubSession(createSubSession.idSession, createSubSession.nameSubSession, createSubSession.status);
    }

    @Get()
    // @UseGuards(BasicAuthGuard)
    async getAllSubSession() {
        return this.subSessionService.getSubSession();
    }

    @Get('/session')
    async getAllSubSessionSession(@Query('idSession') idSession: number) {
        return this.subSessionService.searchSession(idSession);
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
