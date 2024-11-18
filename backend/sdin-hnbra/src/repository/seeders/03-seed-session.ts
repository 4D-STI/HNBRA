import { QueryInterface } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('table_session', [
            {
                idSession: 1,
                idDivision: 1,
                nameSession: 'SIAD',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idSession: 2,
                idDivision: 2,
                nameSession: 'NAC',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idSession: 3,
                idDivision: 3,
                nameSession: 'SERVIÇO DE MEDICINA OPERATIVA',
                status: "invasive",
                createdAt: new Date(),
                updatedAt: new Date()
            },

        ])
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('table_session', null, {})
    }
}
