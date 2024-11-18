import { DataTypes, Model, QueryInterface, DATE, Sequelize } from "sequelize";
import { sessionType } from "../types/sessionType";

export default {
    async up(queryInterface: QueryInterface, sequelize: Sequelize) {
        queryInterface.createTable<Model<sessionType>>('table_session', {

            idSession: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },

            idDivision: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'table_division',
                    key: 'idDivision',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            nameSession: {
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
            }
        })
    },
    async down(queryInterface: QueryInterface) { await queryInterface.dropTable('table_session') }
}