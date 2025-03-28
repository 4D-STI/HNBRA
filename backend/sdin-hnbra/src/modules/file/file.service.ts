import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from 'src/repository/models/file.model';
import { FileValidator } from './validator/file.service.validator';
import * as fs from 'fs-extra';
import * as path from 'path';
import { SubSession } from 'src/repository/models/subSession.model ';
import { Op } from 'sequelize';
import { Users } from 'src/repository/models/user.model';
import { UserPermission } from 'src/repository/models/permission.model';

@Injectable()
export class FileService {
    constructor(
        private readonly fileValidator: FileValidator,
        @InjectModel(File)
        private readonly fileModel: typeof File,
        @InjectModel(SubSession)
        private readonly subSessionModel: typeof SubSession,
        @Inject('USERS_REPOSITORY') private readonly userRepository: typeof Users,
        @InjectModel(UserPermission)
        private readonly permissionModel: typeof UserPermission,
    ) { }



    async downloadFile(idFile: number): Promise<File | null> {

        return this.fileValidator.existsFile(idFile);
    }

    async viewFile(name: string): Promise<File | null> {

        return this.fileValidator.existsFileName(this.fileValidator.removeAcento(name));
    }

    async uploadFile(file: Express.Multer.File, idSubSession: number, description: string, nip: string): Promise<File> {
        const user = await this.userRepository.findByPk(nip);
        if (!user) {
            throw new BadRequestException('Usuário não encontrado')
        }
        const permission = await this.permissionModel.findOne({ where: { nip: user.nip, idSubSession: idSubSession } })
        if (!permission && user.permission != 'admin') {
            throw new BadRequestException('Usuário sem permissão')
        }

        if (file.size > 15206700 && !file.originalname.includes(".mp4")) {
            throw new Error('Tamanho do arquivo não suportado.')
        }
        const fileNameExist = await this.fileModel.findOne({ where: { nameFile: this.fileValidator.removeAcento(file.originalname), idSubSession: idSubSession, status: 'true' } });
        const subSession = await this.fileValidator.existsSubSession(idSubSession);
        const directoryPath = await this.fileValidator.ensureDirectoryExists(idSubSession);
        if (fileNameExist) {
            throw new BadRequestException('Arquivo com mesmo nome cadastrado.')
        }
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        const uniqueFileName = this.fileValidator.generateUniqueFileName(directoryPath, file.originalname);

        const filePath = path.join(directoryPath, uniqueFileName);
        fs.writeFileSync(filePath, file.buffer);

        const savedFile = await this.fileModel.create({
            idSubSession,
            path: filePath,
            nomeSubSession: subSession.nameSubSession,
            nameFile: uniqueFileName,
            description,
            status: true,
            nip: user.nip,
        });

        return savedFile;
    }


    async updateFile(
        idFile: number,
        idSubSession: number,
        description: string,
        nameFile: string,
        status: boolean,
        nip: string,
    ): Promise<File> {
        const user = await this.userRepository.findByPk(nip);
        if (!user) {
            throw new BadRequestException('Usuário não encontrado!');
        }
        const permission = await this.permissionModel.findOne({ where: { nip: user.nip, idSubSession: idSubSession } });
        if (!permission && user.permission != 'admin') {
            throw new BadRequestException('Usuário sem permissão!')
        }

        const file = await this.fileValidator.existsFile(idFile);

        const oldFilePath = file.path;
        const fileDir = path.dirname(oldFilePath);

        const fileExtension = path.extname(oldFilePath);

        const newFileName = this.fileValidator.removeAcento(nameFile).endsWith(fileExtension)
            ? this.fileValidator.removeAcento(nameFile)
            : `${this.fileValidator.removeAcento(nameFile)}${fileExtension}`;

        const newFilePath = path.join(fileDir, newFileName);

        if (file.nameFile !== newFileName) {
            try {
                fs.renameSync(oldFilePath, newFilePath);
            } catch (err) {
                throw new BadRequestException('Erro ao renomear o arquivo no sistema de arquivos.');
            }
        }

        file.idSubSession = idSubSession;
        file.path = newFilePath;
        file.nameFile = newFileName;
        file.description = description;
        file.status = status;

        await file.save();

        return file;
    }

    async getAllFile() {
        return this.fileModel.findAll();
    }

    async getAllFileSubSession(nomeSubSession: string, idSubSession: number) {
        if (idSubSession) {
            const subSessionSession = await this.subSessionModel.findOne({
                where: {
                    idSubSession: idSubSession,
                },
            });
            if (idSubSession == 6) {
                return this.fileModel.findAll({ where: { idSubSession: subSessionSession.idSubSession, status: "true" }, order: [['idFile', 'DESC']] })
            }
            if (!subSessionSession) {
                throw new BadRequestException('Subsessão não encontrada.');
            }
            return this.fileModel.findAll({ where: { idSubSession: subSessionSession.idSubSession, status: "true" }, order: [['nameFile', 'ASC']] })
        }
        nomeSubSession = this.fileValidator.removeAcento(nomeSubSession);
        const subSession = await this.subSessionModel.findOne({
            where: {
                nameSubSession: { [Op.iLike]: `%${nomeSubSession}%` },
            },
        });

        if (!subSession) {
            throw new BadRequestException('Subsessão não encontrada.');
        }
        return this.fileModel.findAll({ where: { nomeSubSession: { [Op.iLike]: `%${nomeSubSession}%` }, status: "true" }, order: [['nameFile', 'ASC']] });
    }

    async deleteFile(idFile: number, nip: string): Promise<void> {
        const user = await this.userRepository.findByPk(nip);
        if (!user) {
            throw new BadRequestException('Usuário não encontrado!');
        }
        const file = await this.fileValidator.existsFile(idFile);
        const permission = await this.permissionModel.findOne({ where: { nip: user.nip, idSubSession: file.idSubSession } })
        if (!permission && user.permission != 'admin') {
            throw new BadRequestException('Usuário sem permissão')
        }

        try {
            if (fs.existsSync(file.path)) {
                await fs.remove(file.path);
            }
            await this.fileModel.update({ status: false, nip: user.nip }, { where: { idFile: file.idFile } })
        } catch (err) {
            throw new BadRequestException('Erro ao excluir o arquivo do sistema de arquivos.');
        }


        // await file.destroy();
    }

    async viewFileLast(id: number): Promise<File | null> {

        return this.fileValidator.existsFileNameLast(id);
    }


    async uploadMp3File(file: Express.Multer.File, idSubSession: number, description: string, nip: string): Promise<File> {

        return this.uploadFile(file, idSubSession, description, nip);
    }


}
