import { DataTypes, Model, QueryInterface, DATE, Sequelize } from "sequelize";
import { fileType } from "../types/fileType ";

export default {
    async up(queryInterface: QueryInterface, sequelize: Sequelize) {
        queryInterface.createTable<Model<fileType>>('tabela_file', {

            idFile: {
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
                    model: 'table_sub_session',
                    key: 'idSubSession',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            path: {
                type: DataTypes.STRING,
                allowNull: false
            },
            nameFile: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            nomeSubSession: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true
            },
            createdAt: {
                type: DATE,
                allowNull: false
            },

            updatedAt: {
                type: DATE
                , allowNull: false
            },

            nip: {
                type: DataTypes.STRING,
                allowNull: false
            },
        })
    },
    async down(queryInterface: QueryInterface) { await queryInterface.dropTable('tabela_file') }
}