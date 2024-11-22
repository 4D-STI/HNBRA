import { Table, Column, Model, PrimaryKey, DataType, Unique, ForeignKey } from 'sequelize-typescript';
import { SessionType } from '../types/sessionType';
import { Division } from './division.model';

@Table({ tableName: 'table_session' })
export class Session extends Model<SessionType> {
    @PrimaryKey
    @Column({ autoIncrement: true, type: DataType.INTEGER })
    idSession: number;


    @ForeignKey(() => Division)
    @Column
    idDivision: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: { len: [2, 100] }
    })
    nameSession: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    status: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date;
}
