import { DataTypes, Model, QueryInterface, Sequelize } from "sequelize";
import { InformationType } from "../types/informationType";

export default {
    async up(queryInterface: QueryInterface, sequelize: Sequelize) {
        queryInterface.createTable<Model<InformationType>>('table_information', {
            idInformation: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
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
            description: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            initAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            expireAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
        });
    },
    async down(queryInterface: QueryInterface) {
        return queryInterface.dropTable('table_information');
    }
};
