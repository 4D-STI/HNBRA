import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
    })
    nip: number;

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
        type: DataType.INTEGER,
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
