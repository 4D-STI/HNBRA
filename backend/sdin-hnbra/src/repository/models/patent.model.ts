import { Table, Column, Model, PrimaryKey, DataType, Unique } from 'sequelize-typescript';
import { PatentType } from '../types/patentType';

@Table({ tableName: 'table_patent' })
export class Patent extends Model<PatentType> {
    @PrimaryKey
    @Column({ autoIncrement: true, type: DataType.INTEGER })
    idPatent: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: { len: [2, 100] }
    })
    patent: string;
}
