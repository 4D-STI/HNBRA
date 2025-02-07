import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from 'src/repository/models/file.model';
import * as fs from 'fs-extra';
import * as path from 'path';
import { SubSession } from 'src/repository/models/subSession.model ';
import { literal, Op, where } from 'sequelize';
import { Scheduling } from 'src/repository/models/scheduling.model';
import { Users } from 'src/repository/models/user.model';
import { Patent } from 'src/repository/models/patent.model';
import { DataType } from 'sequelize-typescript';
import * as moment from 'moment-timezone';

@Injectable()
export class SchedulingService {
    constructor(
        @InjectModel(Scheduling)
        private readonly schedulingModel: typeof Scheduling,
        @InjectModel(Patent)
        private readonly patentModel: typeof Patent,
        @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof Users,
    ) { }

    async createScheduling(scheduling: Scheduling, req: string) {
        scheduling.schedulingStart = moment(scheduling.schedulingStart).tz("America/Sao_Paulo").subtract(3, 'hours').toDate();
        scheduling.schedulingEnd = moment(scheduling.schedulingEnd).tz("America/Sao_Paulo").subtract(3, 'hours').toDate();

        if (!scheduling.nip) {
            scheduling.nip = req.toString()
        }
        const user = await this.usersRepository.findOne({ where: { nip: scheduling.nip } });
        const patent = await this.patentModel.findByPk(user.idPatent);

        scheduling.nameResponsible = (patent.patent, user.warName);

        if (scheduling.schedulingEnd < scheduling.schedulingStart) {
            throw new BadRequestException('O horário final do agendamento deve ser posterior ao horário de início!')
        }

        const conflictingScheduling = await this.schedulingModel.findOne({
            where: {
                typeScheduling: scheduling.typeScheduling,
                [Op.or]: [
                    {
                        schedulingStart: { [Op.between]: [scheduling.schedulingStart, scheduling.schedulingEnd] }
                    },
                    {
                        schedulingEnd: { [Op.between]: [scheduling.schedulingStart, scheduling.schedulingEnd] }
                    },
                    {
                        schedulingStart: { [Op.lte]: scheduling.schedulingStart },
                        schedulingEnd: { [Op.gte]: scheduling.schedulingEnd }
                    }
                ]
            }
        });

        if (conflictingScheduling) {
            throw new BadRequestException('Já existe um agendamento para esse horário.');
        }

        return await this.schedulingModel.create(scheduling);
    }

    async getAllScheduling() {
        await Scheduling.update(
            { status: false },
            {
                where: {
                    schedulingEnd: {
                        [Op.lte]: literal("NOW() + INTERVAL '-3 hours'")
                    },
                    status: {
                        [Op.ne]: false
                    }
                }
            }
        );

        return await this.schedulingModel.findAll({ where: { status: true }, order: [['schedulingStart', 'ASC']] });
    }

    async getAllSchedulingTrue() {
        return await this.schedulingModel.findAll({ order: [['schedulingStart', 'ASC']] });
    }

    async putScheduling(scheduling: Scheduling, req: string) {
        const schedulingOld = await this.schedulingModel.findByPk(scheduling.idScheduling);
        if (schedulingOld.nip != req.toString()) {
            console.log(scheduling.nip, req.toString())
            throw new BadRequestException('Error na atualização, Nip diferente de cadastro do agendamento')
        }
        if (!schedulingOld) {
            throw new BadRequestException('Agendamento não encontrado.');
        }

        const updatedScheduling = {
            schedulingStart: scheduling.schedulingStart ?? schedulingOld.schedulingStart,
            schedulingEnd: scheduling.schedulingEnd ?? schedulingOld.schedulingEnd,
            theme: scheduling.theme ?? schedulingOld.theme,
            description: scheduling.description ?? schedulingOld.description,
            typeScheduling: scheduling.typeScheduling ?? schedulingOld.typeScheduling,
            ramal: scheduling.ramal ?? schedulingOld.ramal,
        };

        try {
            await this.schedulingModel.update(updatedScheduling, { where: { idScheduling: scheduling.idScheduling } });
        }
        catch (e) {
            throw new Error(`Erro ao atualizar agendamento: ${e.message}`);
        }
        return await this.schedulingModel.findByPk(scheduling.idScheduling);
    }

    async deleteScheduling(idScheduling: number, req: string) {
        const schedulingOld = await this.schedulingModel.findByPk(idScheduling);
        if (!schedulingOld) {
            throw new BadRequestException('Agendamento não encontrado!')
        }
        if (schedulingOld.nip != req) {
            throw new BadRequestException('Error ao apagar, Nip diferente de cadastro do agendamento')
        }
        try {
            await this.schedulingModel.destroy({ where: { idScheduling: idScheduling } });
        }
        catch (e) {
            throw new BadRequestException('Erro em deletar :', e);
        }
    }
}
