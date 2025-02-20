import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Users } from './user.model';
import { InformationType } from '../types/informationType';

@Table({ tableName: 'table_information' })
export class Information extends Model<InformationType> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idInformation: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nameDepartament: string;

    @ForeignKey(() => Users)
    @Column
    nip: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: false
    })
    description: string;

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
    initAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    expireAt: Date;

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
