import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { File } from "src/repository/models/file.model";
import { Session } from "src/repository/models/session.model";
import { SubSession } from "src/repository/models/subSession.model ";
import * as path from 'path';
import * as fs from 'fs-extra';

@Injectable()
export class SchedulingValidator {
    constructor(
        @InjectModel(File)
        private readonly fileRepository: typeof File,
        @InjectModel(SubSession)
        private readonly subSessionModel: typeof SubSession,
        @InjectModel(Session)
        private readonly sessionModel: typeof Session,) {
        console.log('FileValidator initialized!');
    }


    async ensureDirectoryExists(idSubSession: number): Promise<string> {
        const subSession = await this.subSessionModel.findByPk(idSubSession);
        const session = await this.sessionModel.findByPk(subSession.idSession);

        if (!subSession) {
            throw new Error('Subseção/divisão não existe.');
        }

        const directoryPath = path.join('/opt/PDFs', subSession.nameSubSession, session.nameSession,);
        await fs.ensureDir(directoryPath);

        return directoryPath;
    }

    removeAcento(text: string): string {
        text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        text = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
        text = text.replace(/ /g, "_");
        text = text.toUpperCase();
        return text;
    }

    generateUniqueFileName(directoryPath: string, originalName: string): string {
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

    async existsSubSession(idSubSession: number) {
        const subSession = await this.subSessionModel.findByPk(idSubSession);
        if (!subSession) {
            throw new BadRequestException('idSubSession não encontrado.')
        }

        return subSession;
    }

    async existsFile(idFile: number) {
        const file = await this.fileRepository.findOne({ where: { idFile: idFile, status: 'true' } });
        if (!file) {
            throw new BadRequestException('Arquivo não encontrado.')
        }

        return file;
    }

    async existsFileName(name: string) {
        const file = await this.fileRepository.findOne({ where: { nameFile: name, status: 'true' } });
        if (!file) {
            throw new BadRequestException('Arquivo não encontrado.')
        }

        return file;
    }

    async existsFileNameLast(id: number) {
        const file = await this.fileRepository.findOne({ where: { idSubSession: id, status: 'true' }, order: [['idFile', 'DESC']] });
        if (!file) {
            throw new BadRequestException('Arquivo não encontrado.')
        }
        if (!file.nameFile.endsWith('.PDF')) {
            throw new BadRequestException('Arquivo não é PDF.');
        }

        return file;
    }





}
