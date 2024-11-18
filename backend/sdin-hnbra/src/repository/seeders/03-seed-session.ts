import { QueryInterface } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('table_session', [
            {
                idSession: 1,
                idDivision: 1,
                nameDivision: 'DEPARTAMENTO DE SAÚDE',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idSession: 2,
                idDivision: 2,
                nameDivision: 'DEPARTAMENTO DE ADMINISTRAÇÃO',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idSession: 3,
                idDivision: 3,
                nameDivision: 'DEPARTAMENTO DE TECNOLOGIA',
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
