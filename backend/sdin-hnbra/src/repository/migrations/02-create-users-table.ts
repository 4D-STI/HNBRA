import { DataTypes, Model, QueryInterface, DATE, Sequelize } from "sequelize";
import { UserType } from "src/repository/types/usersType";

export default {
    async up(queryInterface: QueryInterface, sequelize: Sequelize) {
        queryInterface.createTable<Model<UserType>>('Users', {

            nip: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
                unique: true
            },

            idPatent: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'table_patent',
                    key: 'idPatent',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            warName: {
                type: DataTypes.STRING,
                allowNull: true
            },

            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },

            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false
            },

            status: {
                type: DataTypes.STRING,
                allowNull: false
            },

            permission: {
                type: DataTypes.STRING,
                allowNull: false
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false
            },

            emailPersonal: {
                type: DataTypes.STRING,
                allowNull: true
            },

            emailMb: {
                type: DataTypes.STRING,
                allowNull: true
            },

            contactNumber: {
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
    async down(queryInterface: QueryInterface) { await queryInterface.dropTable('Users') }
}
