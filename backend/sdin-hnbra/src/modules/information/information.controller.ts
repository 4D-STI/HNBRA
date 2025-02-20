import { Controller, Post, Body, Get, Param, Request, UseGuards, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InformationService } from './information.service';
import { InformationType } from 'src/repository/types/informationType';
import { Information } from 'src/repository/models/information.model';
import { CreateInformationDTO } from './dto/create-information-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateInformationDTO } from './dto/update-information-dto';

@Controller('information')
@ApiBearerAuth('JWT-auth')
export class InformationController {
    constructor(private readonly informationService: InformationService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Cria informações gerais na home.' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                nameDepartament: { type: 'string', example: 'TI' },
                description: { type: 'string', example: 'Suporte ao usuáro feito pela 4D 24/7. ' },
                status: { type: 'string', example: 'true' },
                InitAt: { type: 'string', example: '2025-02-06 11:03' },
                expireAt: { type: 'string', example: '2025-02-06 11:03' },
            },
            required: ['nameDepartament', 'description',],
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Informação criada com sucesso.',
        type: Information,
    })
    async crateInformation(@Body() information: CreateInformationDTO, @Request() req): Promise<InformationType> {
        return this.informationService.createInformation(information, req.user.nip);
    }

    @Get()
    async getAllInformation() {
        return this.informationService.getAllInformation();
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    async updateInformatio(
        @Body() information: UpdateInformationDTO,
        @Request() req) {
        return this.informationService.updateInformation(information, req.user.nip);
    }

    @Delete(':idInformation')
    @UseGuards(JwtAuthGuard)
    async deleteInformation(@Param
        ('idInformation') idInformation: number,
    ) {
        this.informationService.deleteInformation(idInformation);
    }
}
