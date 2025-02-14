import { Controller, Post, Param, UseInterceptors, UploadedFile, Body, Get, Res, NotFoundException, Put, Delete, Query, BadRequestException, UseGuards, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File } from 'src/repository/models/file.model';
import { Response } from 'express';
import * as path from 'path';
import { extname } from 'path';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('files')
@ApiBearerAuth('JWT-auth')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    /**
 * Faz o upload de um arquivo para uma sub-sessão específica.
 *
 * Este endpoint permite que usuários enviem arquivos para uma determinada sub-sessão.
 * Apenas usuários com permissão adequada (admin ou permissões específicas) podem realizar o upload.
 *
 * Extensões permitidas: `pdf`, `odp`, `doc`, `xls`, `txt`, `zip`, `odt`, `ods`, `jpg`.
 *
 * O tamanho máximo permitido para arquivos que **não** sejam `.mp4` é **15MB**.
 *
 * @param {Express.Multer.File} file - O arquivo a ser enviado.
 * @param {number} idSubSession - O ID da sub-sessão onde o arquivo será armazenado.
 * @param {string} description - Descrição opcional do arquivo enviado.
 * @param {Request} req - Informações do usuário autenticado (JWT).
 * @returns Retorna um objeto contendo as informações do arquivo salvo.
 * @throws {BadRequestException} Se o usuário não tiver permissão ou o arquivo não for válido.
 */
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
                    example: '',
                },
            },
        },
    })
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('idSubSession') idSubSession: number,
        @Body('description') description: string,
        @Request() req,
    ): Promise<File> {
        console.log('o jwt aqui: ', JwtAuthGuard)
        return await this.fileService.uploadFile(file, idSubSession, description, req.user.nip);
    }


    /**
     * Baixa um arquivo específico pelo ID.
     *
     * Este endpoint permite o download de um arquivo utilizando o seu idFile.
     * O Content-Type é definido com base na extensão do arquivo.
     *
     * @param idFile - Identificador único do arquivo.
     * @param {Request} req - Informações do usuário autenticado (JWT).
     * @returns O arquivo para download.
     */
    @Get(':idFile/download')
    @ApiOperation({ summary: 'Baixa os arquivos com idFile' })
    @ApiResponse({
        status: 200,
        description: 'Baixa os arquivos utilziando o idFile'
    })
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



    /**
     * Visualiza um arquivo específico pelo ID.
     *
     * Este endpoint permite visualizar um arquivo diretamente no navegador.
     *
     * @param idFile - Identificador único do arquivo.
     * @returns O arquivo para visualização.
     */
    @Get(':idFile/view')
    @ApiOperation({ summary: 'Visualiza um arquivo pelo ID' })
    @ApiResponse({ status: 200, description: 'Retorna o arquivo para visualização' })
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

    /**
     * Visualiza o último arquivo associado ao ID informado.
     *
     * Este endpoint retorna a versão mais recente de um arquivo baseado no idFile.
     *
     * @param idFile - Identificador único do arquivo.
     * @returns O último arquivo encontrado para visualização.
     */
    @Get(':idFile/viewLast')
    @ApiOperation({ summary: 'Visualiza o último arquivo pelo ID' })
    @ApiResponse({ status: 200, description: 'Retorna o último arquivo encontrado para visualização' })
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

    /**
     * Atualiza um arquivo existente.
     *
     * Este endpoint permite atualizar informações de um arquivo, como nome, descrição e status.
     *
     * @param idFile - Identificador do arquivo a ser atualizado.
     * @param idSubSession - Identificador da sub-sessão relacionada.
     * @param description - Nova descrição do arquivo.
     * @param nameFile - Novo nome do arquivo.
     * @param status - Status do arquivo.
     * @param {Request} req - Informações do usuário autenticado (JWT).
     * @returns O arquivo atualizado.
     */
    @Put('update')
    @ApiOperation({ summary: 'Atualiza um arquivo existente' })
    @ApiResponse({ status: 200, description: 'Arquivo atualizado com sucesso' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                idFile: { type: 'number' },
                idSubSession: { type: 'number' },
                description: { type: 'string' },
                nameFile: { type: 'string' },
                status: { type: 'string' },
            },
        },
    })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async updateFile(
        @Body('idFile') idFile: number,
        // @Body('nip') nip: string,
        @Body('idSubSession') idSubSession: number,
        @Body('description') description: string,
        @Body('nameFile') nameFile: string,
        @Body('status') status: boolean,
        @Request() req,
    ): Promise<File> {
        return await this.fileService.updateFile(idFile,
            idSubSession, description, nameFile, status, req.user.nip);
    }

    /**
    * Exclui um arquivo pelo ID.
    *
    * Este endpoint desativa um arquivo no sistema.
    *
    * @param id - Identificador único do arquivo.
    * @param {Request} req - Informações do usuário autenticado (JWT).
    * @returns Mensagem de sucesso.
    */
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Exclui um arquivo pelo ID' })
    @ApiResponse({ status: 200, description: 'Arquivo excluído com sucesso' })
    async deleteFile(@Param('id') id: number, @Request() req): Promise<{ message: string }> {
        await this.fileService.deleteFile(id, req.user.nip);
        return { message: 'Arquivo excluído com sucesso.' };
    }

    /**
     * Retorna todos os arquivos cadastrados.
     *
     * Este endpoint retorna todos os arquivos armazenados no sistema.
     *
     * @returns Um array de arquivos.
     */
    @Get()
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Lista todos os arquivos' })
    @ApiResponse({ status: 200, description: 'Lista de arquivos retornada com sucesso' })
    async getAllSession() {
        return this.fileService.getAllFile();
    }

    /**
     * Retorna arquivos de uma sub-sessão específica.
     *
     * Este endpoint permite filtrar arquivos por sub-sessão.
     *
     * @param nomeSubSession - Nome da sub-sessão.
     * @param idSubSession - Identificador da sub-sessão.
     * @returns Lista de arquivos da sub-sessão.
     */
    @Get('/nameSub')
    @ApiOperation({ summary: 'Lista arquivos por sub-sessão' })
    @ApiQuery({ name: 'nomeSubSession', type: 'string', example: 'OBTENÇÃO' })
    async getAllFilesSubSession(@Query('nomeSubSession') nomeSubSession: string,
        @Query('idSubSession') idSubSession: number) {
        return this.fileService.getAllFileSubSession(nomeSubSession, idSubSession);
    }

    /**
     * Faz o upload de um arquivo MP3.
     *
     * Este endpoint permite o envio de arquivos de áudio MP3 e video MP4.
     *
     * @param idSubSession - Identificador da sub-sessão associada ao arquivo.
     * @param description - Descrição do arquivo.
     * @param {Request} req - Informações do usuário autenticado (JWT).
     * @param file - Arquivo MP3 enviado ou MP4.
     * @returns O arquivo enviado.
     */
    @Post(':idSubSession/upload-mp3')
    @ApiOperation({ summary: 'Faz o upload de um arquivo MP3' })
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
    @UseGuards(JwtAuthGuard)
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
        @Request() req,
    ): Promise<File> {
        return await this.fileService.uploadMp3File(file, idSubSession, description, req.user.nip);
    }


}
