import { DataTypes, Model, QueryInterface, DATE, Sequelize } from "sequelize";
import { UserPermissionType } from "../types/userPermissionType ";

export default {
    async up(queryInterface: QueryInterface, sequelize: Sequelize) {
        queryInterface.createTable<Model<UserPermissionType>>('table_user_permission', {

            idPermission: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },

            idSubSession: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'table_session',
                    key: 'idSession',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            nip: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'nip',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            permission: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            createdAt: {
                type: DATE,
                allowNull: false
            },

            updatedAt: {
                type: DATE
                , allowNull: false
            },
            expireAt: {
                type: DATE
                , allowNull: false
            }
        })
    },
    async down(queryInterface: QueryInterface) { await queryInterface.dropTable('table_user_permission') }
}