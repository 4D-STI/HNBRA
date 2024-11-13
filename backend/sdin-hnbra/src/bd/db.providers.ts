
import { Sequelize } from 'sequelize-typescript';
import { users } from '../repository/models/user.model';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'sdin-hnbra-dev',
            });
            sequelize.addModels([users]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
