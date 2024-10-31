import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './src/model/users/users.model';

@Module({
    imports: [
        SequelizeModule.forRoot({

            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgress',
            password: 'postgres',
            database: 'sdin-hnbra',
            autoLoadModels: true,
            models: [User]
        }),
    ],
})

export class AppModule { }
