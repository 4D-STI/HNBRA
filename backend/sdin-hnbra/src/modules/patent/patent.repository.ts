import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from 'src/repository/models/file.model';
import { Patent } from 'src/repository/models/patent.model';

@Injectable()
export class PatentRepository {
    constructor(
        @InjectModel(Patent) private readonly patentModel: typeof Patent,
    ) { }

    // async createFile(fileData: any): Promise<File> {
    //     return this.fileModel.create(fileData);
    // }

    // Outras operações de banco de dados...
}
