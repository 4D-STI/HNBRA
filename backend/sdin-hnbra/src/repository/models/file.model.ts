import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { SubSession } from './subSession.model ';
import { fileType } from '../types/fileType ';

@Table({ tableName: 'tabela_file' })
export class File extends Model<fileType> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idFile: number;

    @ForeignKey(() => SubSession)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idSubSession: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    path: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nameFile: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nomeSubSession: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    status: boolean;

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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nip: string;
}
