import { DataTypes, Model, QueryInterface, DATE, Sequelize } from 'sequelize';
import { schedulingType } from '../types/schedulingType ';

const tableName = 'TABLE_SCHEDULING';

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.createTable<Model<schedulingType>>(tableName, {
            idScheduling: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
            schedulingStart: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            schedulingEnd: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            nameResponsible: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            theme: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            typeScheduling: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ramal: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.dropTable(tableName);
    },
};
