import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';
import { userType } from '../types/usersType';

@Table
export class users extends Model<userType> {
    @PrimaryKey
    @Column({
        type: DataType.STRING,
        primaryKey: true,
    })
    nip: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    patent: string;

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
    department: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    section: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    division: boolean;

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
