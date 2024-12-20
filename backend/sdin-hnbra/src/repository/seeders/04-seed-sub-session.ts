import { QueryInterface } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('table_sub_session', [
            {
                idSession: 2,
                nameSubSession: 'PAGAMENTO',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idSession: 2,
                nameSubSession: 'OBTENCAO',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idSession: 4,
                nameSubSession: 'PAGAMENTO',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idSession: 4,
                nameSubSession: 'OBTENCAO',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idSession: 9,
                nameSubSession: 'ORGANOGRAMA',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idSession: 9,
                nameSubSession: 'PLANO DIA - PD',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idSession: 9,
                nameSubSession: 'CARDÁPIO',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },

        ])
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('table_sub_session', null, {})
    }
}
