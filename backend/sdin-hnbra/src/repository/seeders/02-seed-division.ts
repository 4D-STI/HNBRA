import { QueryInterface } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('table_division', [
            {
                nameDepartament: 'DIRETOR HNBra-01',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nameDepartament: 'VICE-DIRETOR HNBra-02',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nameDepartament: 'DEPARTAMENTO DE SAÚDE HNBra-10',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nameDepartament: 'DEPARTAMENTO DE ADMINISTRAÇÃO HNBra-20',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nameDepartament: 'DEPARTAMENTO DESATIVADO',
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
