import { DataTypes, Model, QueryInterface, DATE, Sequelize } from "sequelize";
import { SubSessionType } from "../types/subSessionType ";

export default {
    async up(queryInterface: QueryInterface, sequelize: Sequelize) {
        queryInterface.createTable<Model<SubSessionType>>('table_sub_session', {

            idSubSession: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },

            idSession: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'table_session',
                    key: 'idSession',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            nameSubSession: {
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
    async down(queryInterface: QueryInterface) { await queryInterface.dropTable('table_sub_session') }
}