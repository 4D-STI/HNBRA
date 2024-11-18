import { DataTypes, Model, QueryInterface, DATE, Sequelize } from "sequelize";
import { divisionType } from "../types/divisionType";

export default {
    async up(queryInterface: QueryInterface, sequelize: Sequelize) {
        queryInterface.createTable<Model<divisionType>>('table_division', {

            idDivision: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                unique: true
            },

            nameDivision: {
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
    async down(queryInterface: QueryInterface) { await queryInterface.dropTable('table_division') }
}