import { Controller, Post, Body, Get, Put, BadRequestException, Query, UseGuards, Delete, Request, Param } from '@nestjs/common';
import { SubSessionService } from './sub-session.service';
import { CreateSubSessionDto } from './dto/create-sub-session';
import { SubSession } from 'src/repository/models/subSession.model ';
import { UpdateSubSessionDto } from './dto/update-sub-session';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('subSession')
@ApiBearerAuth('JWT-auth')
export class SubSessionController {
    constructor(private readonly subSessionService: SubSessionService) { }

    /**
     * Cria uma nova SubSessão. Para criação deve estar logado para autenticação JWT.
     * 
     * @param createSubSession Objeto contendo os dados da nova SubSessão.
     * @returns A SubSessão criada.
     */
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Cria uma nova SubSessão' })
    @ApiResponse({ status: 201, description: 'SubSessão criada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Erro ao criar SubSessão.' })
    async createSession(@Body() createSubSession: CreateSubSessionDto): Promise<SubSession> {
        return this.subSessionService.createSubSession(createSubSession.idSession, createSubSession.nameSubSession, createSubSession.status);
    }

    /**
     * Obtém todas as SubSessões ativas.
     * 
     * @returns Lista de SubSessões.
     */
    @Get()
    @ApiOperation({ summary: 'Obtém todas as SubSessões ativas' })
    @ApiResponse({ status: 200, description: 'Lista de SubSessões retornada com sucesso.' })
    // @UseGuards(BasicAuthGuard)
    async getAllSubSession() {
        return this.subSessionService.getSubSession();
    }

    /**
     * Obtém todas as SubSessões associadas a uma determinada sessão.
     * 
     * @param idSession ID da sessão a ser pesquisada.
     * @returns Lista de SubSessões associadas à sessão especificada.
     */
    @Get('/session')
    @ApiOperation({ summary: 'Obtém todas as SubSessões de uma sessão específica' })
    @ApiResponse({ status: 200, description: 'Lista de SubSessões retornada com sucesso.' })
    async getAllSubSessionSession(@Query('idSession') idSession: number) {
        return this.subSessionService.searchSession(idSession);
    }

    /**
     * Atualiza uma SubSessão existente.Para atualização deve estar logado para autenticação JWT.
     * 
     * @param updateSubSessionDto Objeto contendo os novos dados da SubSessão.
     * @returns Mensagem de sucesso ou erro.
     */
    @Put()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Atualiza uma SubSessão' })
    @ApiResponse({ status: 200, description: 'SubSessão atualizada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Erro ao atualizar SubSessão.' })
    async updateSubSession(@Body() updateSubSessionDto: UpdateSubSessionDto) {
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

    /**
     * Deleta uma SubSessão com base no ID informado. Para deleção deve estar logado para autenticação JWT.
     * 
     * @param idSubSession ID da SubSessão a ser deletada.
     */
    @Delete(':idSubSession')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Deleta uma SubSessão pelo ID' })
    @ApiResponse({ status: 200, description: 'SubSessão deletada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Erro ao deletar SubSessão.' })
    async deleteSubSession(@Param
        ('idSubSession') idSubSession: number,
        // @Request() req
    ) {
        await this.subSessionService.deleteSubSession(idSubSession);
    }

}
