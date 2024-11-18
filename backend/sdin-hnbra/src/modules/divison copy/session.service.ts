import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from 'src/repository/models/session.model';


@Injectable()
export class SessionService {
    constructor(
        @InjectModel(Session)
        private readonly sessionModel: typeof Session,
    ) { }

    async createSession(idDivision: number, nameSession: string, status: string) {
        console.log("=================", nameSession)
        console.log("=================", status)

        return this.sessionModel.create({ idDivision, nameSession, status });
    }

    async getDivision() {
        return this.sessionModel.findAll();
    }

}
