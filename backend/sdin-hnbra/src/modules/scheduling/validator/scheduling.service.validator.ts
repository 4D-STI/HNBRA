import { BadRequestException, ConflictException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { File } from "src/repository/models/file.model";
import { Session } from "src/repository/models/session.model";
import { SubSession } from "src/repository/models/subSession.model ";
import * as path from 'path';
import * as fs from 'fs-extra';
import { Scheduling } from "src/repository/models/scheduling.model";
import * as moment from 'moment-timezone';
import { literal, Op } from 'sequelize';

@Injectable()
export class SchedulingValidator {
    constructor(
        @InjectModel(Scheduling)
        private readonly schedulingModel: typeof Scheduling,) {
        console.log('FileValidator initialized!');
    }


    async verifyScheduling(scheduling: Scheduling) {

        const timeBefore = moment(scheduling.schedulingStart).add(29, 'minutes').toDate();
        const timeAfter = moment(scheduling.schedulingEnd).add(29, 'minutes').toDate();

        const conflictingSchedulingInterval = await this.schedulingModel.findOne({
            where: {
                typeScheduling: scheduling.typeScheduling,
                [Op.or]: [
                    {
                        schedulingEnd: { [Op.between]: [scheduling.schedulingStart, timeBefore] }
                    },
                    {
                        schedulingStart: { [Op.between]: [scheduling.schedulingEnd, timeAfter] }
                    },
                    {
                        schedulingStart: { [Op.gte]: timeBefore },
                        schedulingEnd: { [Op.lte]: timeAfter }
                    }
                ]
            }
        })

        if (conflictingSchedulingInterval) {
            throw new ConflictException('Existe um intervalo entre um agendamento e outro de 30 minutos!');
        }
    }


}
