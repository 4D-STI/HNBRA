import { QueryInterface } from "sequelize";

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.bulkInsert('table_session', [
            {
                idDivision: 4, //DEPARTAMENTO DE ADMINISTRAÇÃO
                nameSession: 'SEÇÃO DE CONFORTO HNBra-20.1',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDivision: 4,
                nameSession: 'SEÇÃO DE INFORMÁTICA HNBRra-20.2',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDivision: 4,
                nameSession: 'SEÇÃO DE ESPORTES HNBra-20.3',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDivision: 4,
                nameSession: 'DIVISÃO DE INTENDÊNCIA HNBra-21',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDivision: 4,
                nameSession: 'DIVISÃO DE PESSOAL HNBra-22',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDivision: 3,
                nameSession: 'SIAD HNBra-10.3',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDivision: 3,
                nameSession: 'NAC HNBra-10.3',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDivision: 1,
                nameSession: 'CONSELHO TÉCNICO HNBra-01.1',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDivision: 5,
                nameSession: 'SEÇÃO DESATIVADA',
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },

        ])
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('table_session', null, {})
    }
}
