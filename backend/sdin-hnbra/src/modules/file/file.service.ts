import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from 'src/repository/models/file.model';
import * as fs from 'fs-extra';
import * as path from 'path';
import { SubSession } from 'src/repository/models/subSession.model ';
import { Inject } from '@nestjs/common';

@Injectable()
export class FileService {
    constructor(
        @InjectModel(File)
        private readonly fileModel: typeof File,
        @InjectModel(SubSession)
        private readonly subSessionModel: typeof SubSession,
    ) { }

    private async ensureDirectoryExists(idSubSession: number): Promise<string> {
        const subSession = await this.subSessionModel.findByPk(idSubSession);

        if (!subSession) {
            throw new Error('SubSession not found');
        }

        const directoryPath = path.join(__dirname, '..', 'uploads', subSession.nameSubSession);

        await fs.ensureDir(directoryPath);

        return directoryPath;
    }

    async downloadFile(idFile: number): Promise<File | null> {
        const file = await this.fileModel.findByPk(idFile);

        if (!file) {
            return null;
        }

        return file;
    }

    private generateUniqueFileName(directoryPath: string, originalName: string): string {
        const ext = path.extname(originalName);
        const baseName = path.basename(originalName, ext);
        let uniqueName = originalName;
        let counter = 1;

        while (fs.existsSync(path.join(directoryPath, uniqueName))) {
            uniqueName = `${baseName}(${counter})${ext}`;
            counter++;
        }

        return uniqueName;
    }

    async uploadFile(file: Express.Multer.File, idSubSession: number, description: string): Promise<File> {
        const directoryPath = await this.ensureDirectoryExists(idSubSession);

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        const uniqueFileName = this.generateUniqueFileName(directoryPath, file.originalname);

        // Caminho final do arquivo
        const filePath = path.join(directoryPath, uniqueFileName);

        fs.writeFileSync(filePath, file.buffer);

        const savedFile = await this.fileModel.create({
            idSubSession,
            path: filePath,
            nameFile: uniqueFileName,
            description,
            status: true,
        });

        return savedFile;
    }


    async updateFile(
        idFile: number,
        idSubSession: number,
        description: string,
        nameFile: string,
        status: boolean,
    ): Promise<File> {
        const file = await this.fileModel.findByPk(idFile);

        if (!file) {
            throw new BadRequestException('idFile não existe.');
        }

        const oldFilePath = file.path;
        const fileDir = path.dirname(oldFilePath);
        const newFilePath = path.join(fileDir, nameFile);

        if (file.nameFile !== nameFile) {
            try {
                fs.renameSync(oldFilePath, newFilePath);
            } catch (err) {
                throw new BadRequestException('Erro ao renomear o arquivo no sistema de arquivos.');
            }
        }

        file.idSubSession = idSubSession;
        file.path = newFilePath;
        file.nameFile = nameFile;
        file.description = description;
        file.status = status;

        await file.save();

        return file;
    }


    async getAllFile() {
        return this.fileModel.findAll();
    }
}
