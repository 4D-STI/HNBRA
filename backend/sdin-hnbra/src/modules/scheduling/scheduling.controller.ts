import { Controller, Post, Param, Body, Get, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Scheduling } from 'src/repository/models/scheduling.model';

@Controller('scheduling')
@ApiBearerAuth('JWT-auth')
export class SchedulingController {
    constructor(private readonly schedulingService: SchedulingService) { }

    /**
     * Cria um agendamento para reunião ou auditório.
     *
     * Este endpoint permite criar um novo agendamento para uma reunião ou auditório, 
     * informando a data/hora de início e fim, tema, descrição, tipo de agendamento e ramal.
     * O usuário autenticado (através do JwtAuthGuard) é identificado e seu NIP é usado 
     * para relacionar o agendamento ao responsável.
     *
     * @param scheduling Objeto com as informações do agendamento.
     * @param req Objeto de requisição que contém os dados do usuário autenticado.
     * @returns Os dados do agendamento criado.
     */
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Cria um agendamento para reunião ou auditório' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                schedulingStart: { type: 'string', example: '2025-02-06 11:03' },
                schedulingEnd: { type: 'string', example: '2025-02-06 11:05' },
                theme: { type: 'string', example: 'Reunião de Alinhamento' },
                description: { type: 'string', example: 'Discussão sobre metas e resultados' },
                typeScheduling: { type: 'string', example: 'Reunião' },
                ramal: { type: 'number', example: 7304 },
            },
            required: ['schedulingStart', 'schedulingEnd', 'theme', 'description', 'typeScheduling', 'ramal'],
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Agendamento criado com sucesso',
        type: Scheduling,
    })
    @ApiResponse({ status: 400, description: 'Requisição inválida' })
    async createScheduling(
        @Body() scheduling: Scheduling,
        @Request() req
    ) {
        return await this.schedulingService.createScheduling(scheduling, req.user.nip);
    }


    /**
     * Retorna todos os agendamentos.
     *
     * Este endpoint traz todos os agendamentos cadastrados, incluindo os que já ocorreram 
     * e os que ainda irão ocorrer.
     *
     * @returns Um array de agendamentos.
     */
    @Get()
    @ApiOperation({ summary: 'Lista apenas os agendamentos que irão ocorrer' })
    @ApiResponse({
        status: 200,
        description: 'Lista de agendamentos futuros retornada com sucesso',
        isArray: true,
        type: Scheduling,
    })
    async getAllScheduling() {
        return this.schedulingService.getAllScheduling();
    }

    /**
     * Retorna apenas os agendamentos que ainda irão ocorrer.
     *
     * Este endpoint traz somente os agendamentos futuros, ou seja, aqueles que ainda não aconteceram.
     *
     * @returns Um array contendo os agendamentos que irão ocorrer.
     */
    @Get('/schedulingTrue')
    @ApiOperation({ summary: 'Lista todos os agendamentos' })
    @ApiResponse({
        status: 200,
        description: 'Lista de agendamentos retornada com sucesso',
        isArray: true,
        type: Scheduling,
    })
    async getAllSchedulingTrue() {
        return this.schedulingService.getAllSchedulingTrue();
    }


    /**
     * Atualiza os agendamentos que irão ocorrer.
     *
     * Este endpoint atualiza os dados de um agendamento existente. Caso algum campo não seja informado,
     * o valor antigo é mantido. O endpoint espera receber o objeto de agendamento com as novas informações e
     * utiliza os dados do usuário autenticado (por meio do JWT) para atualizar o registro.
     *
     * @param scheduling Objeto contendo os dados para atualização do agendamento.
     * @param req Objeto de requisição que contém as informações do usuário autenticado.
     * @returns O resultado da operação de atualização.
     */
    @Put()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Atualiza os agendamentos que irão ocorrer' })
    @ApiResponse({
        status: 200,
        description: 'Agendamento atualizado com sucesso',
        isArray: true,
        type: Scheduling,
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                idScheduling: { type: 'number', example: 1 },
                schedulingStart: { type: 'string', example: '2025-02-06 11:03' },
                schedulingEnd: { type: 'string', example: '2025-02-06 11:05' },
                theme: { type: 'string', example: 'Reunião de Alinhamento' },
                description: { type: 'string', example: 'Discussão sobre metas e resultados' },
                typeScheduling: { type: 'string', example: 'Reunião' },
                ramal: { type: 'number', example: 7304 },
            },
            required: ['schedulingStart', 'schedulingEnd', 'theme', 'description', 'typeScheduling', 'ramal'],
        },
    })
    async putScheduling(
        @Body() scheduling: Scheduling,
        @Request() req
    ) {
        return this.schedulingService.putScheduling(scheduling, req.user.nip);
    }


    @Delete(':idScheduling')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Deleta Agendamento' })
    @ApiResponse({
        status: 200,
        description: 'Agendamento deletado com sucesso!',
    })
    async deleteScheduling(@Param
        ('idScheduling') idScheduling: number,
        @Request() req
    ) {
        await this.schedulingService.deleteScheduling(idScheduling, req.user.nip);
        return { message: 'Agendamento excluído com sucesso.' };
    }


}
