import { QueryInterface } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('table_division', [
            {
                nameDivision: 'DIRETOR HNBra-01',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nameDivision: 'VICE-DIRETOR HNBra-02',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nameDivision: 'DEPARTAMENTO DE SAÚDE HNBra-10',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nameDivision: 'DEPARTAMENTO DE ADMINISTRAÇÃO HNBra-20',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nameDivision: 'DEPARTAMENTO DESATIVADO',
                status: "invasive",
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('table_division', null, {});
    }
};
