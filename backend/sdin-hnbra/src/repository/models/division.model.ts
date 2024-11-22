import { Table, Column, Model, PrimaryKey, DataType, Unique } from 'sequelize-typescript';
import { DivisionType } from 'src/repository/types/divisionType';

@Table({ tableName: 'table_division' })
export class Division extends Model<DivisionType> {
    @PrimaryKey
    @Column({ autoIncrement: true, type: DataType.INTEGER })
    idDivision: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: { len: [2, 100] }
    })
    nameDivision: string;

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
