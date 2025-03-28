import { Controller, Post, Body, Get, Param, Request, UseGuards, Put, Delete } from '@nestjs/common';
import { UserPermissionService } from './user-permission.service';
import { CreateUserPermissionDTO } from './dto/create-user-permission-dto';
import { UserPermission } from 'src/repository/models/permission.model';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserPermissionType } from 'src/repository/types/userPermissionType ';

@Controller('user-permission')
@ApiBearerAuth('JWT-auth')
export class UserPermissionController {
    constructor(private readonly userPermissionService: UserPermissionService) { }

    /**
     * Cria uma nova permissão para um usuário.
     *
     * Este endpoint cria uma nova permissão de usuário com base nos dados enviados.
     *
     * @param createPermission Objeto contendo as informações para criação da permissão.
     * @returns A permissão de usuário criada.
     */
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Cria uma nova permissão para usuário' })
    @ApiResponse({
        status: 201,
        description: 'Permissão de usuário criada com sucesso',
        type: UserPermission,
    })
    async createUserPermission(@Body() createPermission: CreateUserPermissionDTO, @Request() req): Promise<UserPermission> {
        return this.userPermissionService.createUserPermission(createPermission, req.user.nip);
    }

    /**
     * Lista todos os usuários com permissão.
     *
     * Este endpoint retorna a lista de todos os usuários que possuem alguma permissão definida.
     *
     * @returns Um array contendo as permissões de usuário.
     */
    @Get('/')
    @ApiOperation({ summary: 'Lista todos os usuários com permissão' })
    @ApiResponse({
        status: 200,
        description: 'Lista de todos os usuários com permissão retornada com sucesso',
        isArray: true,
        type: UserPermission,
    })
    async getAllPermission(): Promise<UserPermission[]> {
        return this.userPermissionService.getAllPermission();
    }

    /**
     * Lista todas as permissões de um usuário específico.
     *
     * Este endpoint retorna todas as permissões associadas a um usuário identificado pelo NIP.
     *
     * @param nip O identificador único do usuário (NIP).
     * @returns Um array contendo as permissões do usuário.
     */
    @Get(':nip')
    @ApiOperation({ summary: 'Lista todas as permissões do usuário' })
    @ApiResponse({
        status: 200,
        description: 'Lista todas as permissões do usuário retornada com sucesso',
        isArray: true,
        type: UserPermission,
    })
    async getAllPermissionNip(@Param('nip') nip: string): Promise<UserPermission[]> {
        return this.userPermissionService.getAllPermissionNip(nip);
    }

    /**
 * Atualiza permissão para um usuário.
 *
 * Este endpoint atualiza permissão de usuário com base nos dados enviados.
 *
 * @param deletePermission Objeto contendo as informações para criação da permissão.
 * @returns A permissão de usuário criada.
 */
    @Put()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Atualiza permissão para usuário' })
    @ApiResponse({
        status: 201,
        description: 'Permissão de usuário atualizada com sucesso',
        type: UserPermission,
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                idPermission: { type: 'number', example: 1 },
                idSubSession: { type: 'number', example: 6 },
                nip: { type: 'string', example: '000015560' },
                permission: { type: 'number', example: 4 },
                status: { type: 'boolean', example: true },
            },
            required: ['schedulingStart', 'schedulingEnd', 'theme', 'description', 'typeScheduling', 'ramal'],
        },
    })
    async updatePermission(@Body() deletePermission: UserPermissionType, @Request() req) {
        return this.userPermissionService.updatePermission(deletePermission, req.user.nip);
    }

    @Delete(':idPermission')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Deleta permissão' })
    @ApiResponse({
        status: 200,
        description: 'Permissão deletado com sucesso!',
    })
    async deleteScheduling(@Param
        ('idPermission') idPermission: number,
        @Request() req
    ) {
        await this.userPermissionService.deletePermission(idPermission, req.user.nip);
        return { message: 'Agendamento excluído com sucesso.' };
    }
}
