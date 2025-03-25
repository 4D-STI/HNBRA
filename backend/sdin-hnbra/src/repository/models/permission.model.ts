import { Table, Column, Model, PrimaryKey, DataType, Unique, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserPermissionType } from '../types/userPermissionType ';
import { SubSession } from './subSession.model ';
import { Users } from './user.model';

@Table({ tableName: 'table_user_permissions' })
export class UserPermission extends Model<UserPermissionType> {
    @PrimaryKey
    @Column({ autoIncrement: true, type: DataType.INTEGER })
    idPermission: number;


    @ForeignKey(() => SubSession)
    @Column
    idSubSession: number;

    @BelongsTo(() => SubSession, { foreignKey: 'idSubSession' })
    subSession: SubSession;

    @ForeignKey(() => Users)
    @Column
    nip: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    permission: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    status: boolean;

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

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    expireAt: Date;
}
