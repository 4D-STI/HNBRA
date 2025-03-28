import { ScheduleType } from '@/app/contracts/types/ScheduleType'

export interface IScheduleItem {
    idScheduling: number;
    nip: string;
    schedulingStart: Date;
    schedulingEnd: Date;
    nameResponsible: string;
    theme: string;
    description: string;
    typeScheduling: ScheduleType;
    ramal: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
