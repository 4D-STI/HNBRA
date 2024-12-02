import { QueryInterface } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('table_sub_session', [
            {
                idSession: 1,
                nameSubSession: 'PAGAMENTO',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idSession: 1,
                nameSubSession: 'OBTENCAO',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            }

        ])
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('table_sub_session', null, {})
    }
}
