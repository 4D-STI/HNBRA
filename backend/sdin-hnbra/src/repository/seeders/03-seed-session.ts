import { QueryInterface } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('table_session', [
            {
                idDivision: 2,
                nameSession: 'DIVISÃO DE INTENDÊNCIA',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDivision: 2,
                nameSession: 'NAC',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
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
