import { Table, Column, Model, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { UserType } from '../types/usersType';
import { Patent } from './patent.model';

@Table({
    timestamps: true,
})
export class Users extends Model<UserType> {
    @PrimaryKey
    @Column({
        type: DataType.STRING,
        primaryKey: true,
    })
    nip: string;

    @ForeignKey(() => Patent)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idPatent: number;


    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    warName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    role: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    permission: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true,
        },
    })
    emailPersonal: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true,
    })
    emailMb: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    contactNumber: string;

}
