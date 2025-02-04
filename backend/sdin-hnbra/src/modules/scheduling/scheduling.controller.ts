import { Controller, Post, Param, UseInterceptors, UploadedFile, Body, Get, Res, NotFoundException, Put, Delete, Query, BadRequestException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './scheduling.service';
import { File } from 'src/repository/models/file.model';
import { Response } from 'express';
import * as path from 'path';
import { extname } from 'path';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('scheduling')
@ApiBearerAuth('JWT-auth')
export class SchedulingController {
    constructor(private readonly fileService: FileService) { }

    @Post(':idSubSession/upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter: (req, file, callback) => {
                // Permitir apenas arquivos PDF e imagens JPEG/JPG/PNG
                const allowedExtensions = /pdf|odp|doc|xls|txt|zip|odt|ods|jpg/;
                const extname = path.extname(file.originalname).toLowerCase();

                if (!allowedExtensions.test(extname)) {
                    return callback(new BadRequestException(`Somente arquivos de extensão, ${allowedExtensions}`), false);
                }

                callback(null, true); // Aceitar o arquivo
            },
        }),
    )
    @ApiConsumes('multipart/form-data') // Indica que o endpoint consome arquivos
    @ApiOperation({ summary: 'Upload de arquivo' })
    @ApiBody({
        description: 'Extensões aceitas: pdf | odp | doc | xls | txt | zip | odt | ods | jpg',
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
        console.log('o jwt aqui: ', JwtAuthGuard)
        return await this.fileService.uploadFile(file, idSubSession, description);
    }

    // @Get(':idFile/download')
    // async downloadFile(@Param('idFile') idFile: number, @Res() res: Response) {
    //     const file = await this.fileService.downloadFile(idFile);
    //     if (!file) {
    //         throw new NotFoundException('File not found');
    //     }

    //     res.setHeader('Content-Type', 'application/pdf');
    //     res.setHeader('Content-Disposition', `attachment; filename=${file.nameFile}`);
    //     // res.setHeader('Content-Disposition', `inline; filename=${file.nameFile}`);

    //     // const stream = createReadStream(file.path);
    //     // stream.pipe(res);

    //     return res.sendFile(file.path);
    // }



    @Get(':idFile/download')
    async downloadFile(@Param('idFile') idFile: number, @Res() res: Response) {
        const file = await this.fileService.downloadFile(idFile);
        if (!file) {
            throw new NotFoundException('File not found');
        }

        const fileExtension = extname(file.nameFile).toLowerCase();
        let contentType: string;

        // Defina o Content-Type baseado na extensão do arquivo
        switch (fileExtension) {
            case '.pdf':
                contentType = 'application/pdf';
                break;
            case '.jpg':
                contentType = 'image/jpeg'
                break;
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.txt':
                contentType = 'text/plain';
                break;
            case '.zip':
                contentType = 'application/zip';
                break;
            // Adicione mais tipos de conteúdo conforme necessário
            default:
                contentType = 'application/octet-stream'; // Tipo genérico para arquivos desconhecidos
        }

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename=${file.nameFile}`);

        return res.sendFile(file.path);
    }



    @Get(':idFile/view')
    async viewFile(@Param('idFile') name: string, @Res() res: Response) {
        const file = await this.fileService.viewFile(name);
        if (!file) {
            throw new NotFoundException('File not found');
        }

        res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', `attachment; filename=${file.nameFile}`);
        res.setHeader('Content-Disposition', `inline; filename=${file.nameFile}`);

        const stream = createReadStream(file.path);
        stream.pipe(res);

        // return res.sendFile(file.path);
    }

    @Get(':idFile/viewLast')
    async viewFilelast(@Param('idFile') id: number, @Res() res: Response) {
        const file = await this.fileService.viewFileLast(id);
        if (!file) {
            throw new NotFoundException('File not found');
        }

        res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', `attachment; filename=${file.nameFile}`);
        res.setHeader('Content-Disposition', `inline; filename=${file.nameFile}`);

        const stream = createReadStream(file.path);
        stream.pipe(res);

        // return res.sendFile(file.path);
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
    @UseGuards(JwtAuthGuard)
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
    async getAllFilesSubSession(@Query('nomeSubSession') nomeSubSession: string,
        @Query('idSubSession') idSubSession: number) {
        return this.fileService.getAllFileSubSession(nomeSubSession, idSubSession);
    }


    @Post(':idSubSession/upload-mp3')
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter: (req, file, callback) => {
                // Permitir apenas arquivos MP3
                const allowedExtensions = /mp3|mp4/;
                const extname = path.extname(file.originalname).toLowerCase();

                if (!allowedExtensions.test(extname)) {
                    return callback(new BadRequestException('Somente arquivos com extensão .mp3 são permitidos'), false);
                }

                callback(null, true);
            },
        }),
    )
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Upload de arquivo MP3' })
    @ApiBody({
        description: 'Arquivo MP3 a ser enviado',
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
    async uploadMp3File(
        @UploadedFile() file: Express.Multer.File,
        @Param('idSubSession') idSubSession: number,
        @Body('description') description: string,
    ): Promise<File> {
        return await this.fileService.uploadMp3File(file, idSubSession, description);
    }


}
