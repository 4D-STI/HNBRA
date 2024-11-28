import { Controller, Post, Param, UseInterceptors, UploadedFile, Body, Get, Res, NotFoundException, Put, Delete, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File } from 'src/repository/models/file.model';
import { Response } from 'express';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Post(':idSubSession/upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data') // Indica que o endpoint consome arquivos
    @ApiOperation({ summary: 'Upload de arquivo PDF' })
    @ApiBody({
        description: 'Arquivo PDF a ser enviado',
        type: 'multipart/form-data',
        required: true,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                description: {
                    type: 'string',
                    description: 'Descrição do arquivo',
                },
            },
        },
    })
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('idSubSession') idSubSession: number,
        @Body('description') description: string,
    ): Promise<File> {
        return await this.fileService.uploadFile(file, idSubSession, description);
    }

    @Get(':idFile/download')
    async downloadFile(@Param('idFile') idFile: number, @Res() res: Response) {
        const file = await this.fileService.downloadFile(idFile);
        if (!file) {
            throw new NotFoundException('File not found');
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${file.nameFile}`);

        return res.sendFile(file.path);
    }


    @Put('update')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                idFile: { type: 'number' },
                // nip: { type: 'string' },
                idSubSession: { type: 'number' },
                description: { type: 'string' },
                nameFile: { type: 'string' },
                status: { type: 'string' },
                // file: {
                //     type: 'string',
                //     format: 'binary',
                // },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async updateFile(
        @Body('idFile') idFile: number,
        // @Body('nip') nip: string,
        @Body('idSubSession') idSubSession: number,
        @Body('description') description: string,
        @Body('nameFile') nameFile: string,
        @Body('status') status: boolean,
    ): Promise<File> {
        return await this.fileService.updateFile(idFile,
            idSubSession, description, nameFile, status);
    }

    @Delete(':id')
    async deleteFile(@Param('id') id: number): Promise<{ message: string }> {
        await this.fileService.deleteFile(id);
        return { message: 'Arquivo excluído com sucesso.' };
    }

    @Get()
    async getAllSession() {
        return this.fileService.getAllFile();
    }

    @Get('/nameSub')
    @ApiQuery({
        name: 'nomeSubSession',
        type: 'string',
        description: 'Name of the sub-session to retrieve files for',
        example: 'OBTENÇÃO',
    })
    async getAllFilesSubSession(@Query('nomeSubSession') nomeSubSession: string) {
        return this.fileService.getAllFileSubSession(nomeSubSession);
    }

}
