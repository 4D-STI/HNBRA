import { QueryInterface } from "sequelize";
import * as bcrypt from 'bcryptjs'

const saltRounds = 10;

export default {
    async up(queryInterface: QueryInterface) {

        await queryInterface.bulkInsert('Users', [
            {
                nip: '12345678',
                idPatent: 1,
                warName: 'HB',
                firstName: 'Helber',
                lastName: 'Brito',
                role: 'admin',
                status: "true",
                permission: 'rwe',
                password: await bcrypt.hash('123', saltRounds),
                emailPersonal: 'email@email.com',
                emailMb: 'email@mb.mil.br',
                contactNumber: 6199887766,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nip: '11223344',
                idPatent: 1,
                warName: 'Calvacante',
                firstName: 'Alexandre',
                lastName: 'Cavalcante',
                role: 'admin',
                status: "true",
                permission: 'rwe',
                password: await bcrypt.hash('123', saltRounds),
                emailPersonal: 'alexandre.cavalcante@email.com',
                emailMb: 'alexandre.cavalcante@mb.mil.br',
                contactNumber: 6199887766,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nip: '20240011',
                idPatent: 2,
                warName: 'Comandante',
                firstName: 'Sandro',
                lastName: 'Marinha',
                role: 'admin',
                status: "true",
                permission: 'rwe',
                password: await bcrypt.hash('123', saltRounds),
                emailPersonal: 'email@email.com',
                emailMb: 'email@mb.mil.br',
                contactNumber: 6199887766,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nip: '22186921',
                idPatent: 10,
                warName: 'Luanna Viana',
                firstName: 'Luanna',
                lastName: 'Viana',
                role: 'admin',
                status: "true",
                permission: 'rwe',
                password: await bcrypt.hash('123', saltRounds),
                emailPersonal: 'luanna.viana@email.com',
                emailMb: 'luanna.viana@mb.mil.br',
                contactNumber: 6199887766,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nip: '00000000',
                idPatent: 10,
                warName: 'Inativo',
                firstName: 'Zé',
                lastName: 'Da Manga',
                role: 'user',
                status: "false",
                permission: 'rwe',
                password: await bcrypt.hash('123', saltRounds),
                emailPersonal: 'ze.da.manga@email.com',
                emailMb: 'ze.da.manga@mb.mil.br',
                contactNumber: 6199887766,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                nip: '99999999',
                idPatent: 10,
                warName: 'SO USUARIO',
                firstName: 'USUARIO',
                lastName: 'DE TESTE',
                role: 'user',
                status: "true",
                permission: 'r',
                password: await bcrypt.hash('123', saltRounds),
                emailPersonal: 'ze.da.manga@email.com',
                emailMb: 'ze.da.manga@mb.mil.br',
                contactNumber: 6199887766,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ])
    },

    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('Users', null, {})
    }
}
