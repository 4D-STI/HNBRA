import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { PatentService } from './patent.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Patent } from 'src/repository/models/patent.model';

@Controller('patent')
@ApiBearerAuth('JWT-auth')
export class PatentController {

    constructor(private readonly patentService: PatentService) { }

    @Get()
    async getAllSession() {
        return this.patentService.getPatent();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Cria patente' })
    @ApiBody({
        schema: {
            properties: {
                patent: { type: 'string', example: 'Servidor-civil' },
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Patente criado com sucesso!',
        type: Patent
    })
    @ApiResponse({ status: 400, description: 'Requisição inválida' })
    async createPatent(
        @Body() patent: Patent,
        @Request() req,
    ) {
        return await this.patentService.createPatent(patent, req.user.nip);
    }

    @Delete(':idPatent')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Deleta Patente' })
    @ApiResponse({
        status: 200,
        description: 'Patente deletada com sucesso'
    })
    @ApiResponse({
        status: 200,
        description: 'Sucesso em deletar patente'
    })
    @ApiResponse({
        status: 400,
        description: 'Erro ao deletar patente'
    })
    async deletePatent(@Param
        ('idPatent') idPatent: number,
        @Request() req
    ) {
        return await this.patentService.deletePatent(idPatent, req.user.nip);
    }

}
