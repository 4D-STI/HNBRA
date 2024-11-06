import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';
import { userType } from '../types/usersType';

@Table
export class users extends Model<userType> {
    @PrimaryKey
    @Column({
        type: DataType.DECIMAL(8, 0),
        primaryKey: true,
    })
    nip: Number;

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
        unique: true,
    })
    department: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    section: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    division: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    role: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    status: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
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
        validate: {
            isEmail: true,
        },
    })
    emailMb: string;

    @Column({
        type: DataType.DECIMAL(10, 0),
        allowNull: true,
    })
    contactNumber: number;


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
