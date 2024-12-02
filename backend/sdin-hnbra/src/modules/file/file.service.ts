import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from 'src/repository/models/file.model';
import * as fs from 'fs-extra';
import * as path from 'path';
import { SubSession } from 'src/repository/models/subSession.model ';
import { Session } from 'src/repository/models/session.model';
import { where } from 'sequelize';

@Injectable()
export class FileService {
    constructor(
        @InjectModel(File)
        private readonly fileModel: typeof File,
        @InjectModel(SubSession)
        private readonly subSessionModel: typeof SubSession,
        @InjectModel(Session)
        private readonly sessionModel: typeof Session,
    ) { }

    private async ensureDirectoryExists(idSubSession: number): Promise<string> {
        const subSession = await this.subSessionModel.findByPk(idSubSession);
        const session = await this.sessionModel.findByPk(subSession.idSession);

        if (!subSession) {
            throw new Error('Subção/divisão não existe.');
        }

        const directoryPath = path.join(__dirname, '..', '..', '..', 'arquivosPDFs', 'uploads', subSession.nameSubSession, session.nameSession,);

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

    private removeAcento(text: string): string {
        text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        text = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
        text = text.replace(/ /g, "_");
        return text;
    }

    private generateUniqueFileName(directoryPath: string, originalName: string): string {
        originalName = Buffer.from(originalName, 'latin1').toString('utf8');
        originalName = this.removeAcento(originalName);
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

        const filePath = path.join(directoryPath, uniqueFileName);

        fs.writeFileSync(filePath, file.buffer);

        const subSession = await this.subSessionModel.findByPk(idSubSession);
        const savedFile = await this.fileModel.create({
            idSubSession,
            path: filePath,
            nomeSubSession: subSession.nameSubSession,
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

    async getAllFileSubSession(nomeSubSession: string) {
        nomeSubSession = nomeSubSession.toUpperCase();
        const subSession = await this.subSessionModel.findOne({
            where: {
                nameSubSession: nomeSubSession,
            },
        });

        if (!subSession) {
            throw new BadRequestException('Subsessão não encontrada.');
        }
        return this.fileModel.findAll({ where: { nomeSubSession: nomeSubSession } });
    }

    async deleteFile(idFile: number): Promise<void> {
        const file = await this.fileModel.findByPk(idFile);

        if (!file) {
            throw new BadRequestException('Arquivo não encontrado.');
        }

        try {
            if (fs.existsSync(file.path)) {
                await fs.remove(file.path);
            }
        } catch (err) {
            throw new BadRequestException('Erro ao excluir o arquivo do sistema de arquivos.');
        }

        await file.destroy();
    }
}
