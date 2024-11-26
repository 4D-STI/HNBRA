import { Controller, Post, Param, UseInterceptors, UploadedFile, Body, Get, Res, NotFoundException, Put, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File } from 'src/repository/models/file.model';
import { Response } from 'express';

@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Post(':idSubSession/upload')
    @UseInterceptors(FileInterceptor('file'))
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
    @UseInterceptors(FileInterceptor('file'))
    async updateFile(
        @Body('idFile') idFile: number,
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
}
