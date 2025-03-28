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

export enum ScheduleType {
    auditorium = 'auditorium',
    meeting_room = 'meeting-room'
}

export enum OrderType {
    asc = 'asc',
    des = 'des'
}
