import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { SubSession } from './subSession.model ';
import { schedulingType } from '../types/schedulingType ';
import { Users } from './user.model';

@Table({ tableName: 'TABLE_SCHEDULING' })
export class Scheduling extends Model<schedulingType> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idScheduling: number;

    @ForeignKey(() => Users)
    @Column(({
        type: DataType.STRING,
        allowNull: false,
    }))
    nip: string;

    @Column({
        type: DataType.DATE,
    })
    scheduling: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nameResponsible: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    theme: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    typeScheduling: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    ramal: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date;
}
