import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from 'src/repository/models/file.model';
import * as fs from 'fs-extra';
import * as path from 'path';
import { SubSession } from 'src/repository/models/subSession.model ';
import { Session } from 'src/repository/models/session.model';
import { Patent } from 'src/repository/models/patent.model';

@Injectable()
export class PatentService {
    constructor(
        @InjectModel(Patent)
        private readonly patentRepository: typeof Patent,
    ) { }


    async getPatent() {
        return this.patentRepository.findAll();
    }
}
