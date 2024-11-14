import { QueryInterface } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('table_division', [
            {
                idDivision: 1,
                nameDivision: 'DEPARTAMENTO DE SAÚDE',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDivision: 2,
                nameDivision: 'DEPARTAMENTO DE ADMINISTRAÇÃO',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDivision: 3,
                nameDivision: 'DEPARTAMENTO DE TECNOLOGIA',
                status: "invasive",
                createdAt: new Date(),
                updatedAt: new Date()
            },

        ])
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('table_division', null, {})
    }
}
