import { DataTypes, DATE, Model, QueryInterface, Sequelize } from "sequelize";
import { PatentType } from "../types/patentType";

export default {
    async up(queryInterface: QueryInterface, sequelize: Sequelize) {
        queryInterface.createTable<Model<PatentType>>('table_patent', {

            idPatent: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            patent: {
                type: DataTypes.STRING,
                allowNull: false
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
    async down(queryInterface: QueryInterface) { await queryInterface.dropTable('table_patent') }
}