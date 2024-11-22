import { Table, Column, Model, PrimaryKey, DataType, Unique, ForeignKey } from 'sequelize-typescript';
import { Session } from './session.model';
import { SubSessionType } from '../types/subSessionType ';

@Table({ tableName: 'table_sub_session' })
export class SubSession extends Model<SubSessionType> {
    @PrimaryKey
    @Column({ autoIncrement: true, type: DataType.INTEGER })
    idSubSession: number;


    @ForeignKey(() => Session)
    @Column
    idSession: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: { len: [2, 100] }
    })
    nameSubSession: string;

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
