import { QueryInterface } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('table_patent', [
            {
                patent: 'MARINHEIRO',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'CABO',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'SARGENTO 3º',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'SARGENTO 2º',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'SARGENTO 1º',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'SUBOFICIAL',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'ASPIRANTE',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'GUARDA-MARINHA',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'TENENTE 2º',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'TENENTE 1º',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'CAPITÃO-TENENTE',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'CAPITÃO DE CORVETA',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'CAPITÃO DE FRAGATA',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'CAPITÃO DE MAR E GUERRA',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'CONTRA-ALMIRANTE',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'VICE-ALMIRANTE',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'ALMIRANTE DE ESQUADRA',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                patent: 'ALMIRANTE',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]
        )
    },
    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('table_patent', null, {})
    }
}
