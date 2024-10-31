
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../model/users/users.model';
import { Sequelize } from 'sequelize';
// import userMock from '../../test/mocks/users.mock'

@Injectable()
export class UsersService {
    // private userMock = userMock;

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private sequelize: Sequelize
    ) { }

    async findAll(): Promise<User[]> {
        console.log('acessou findAll');

        return this.userModel.findAll();
    }

    findOne(nip: number): Promise<User> {
        console.log('acessou findOne');

        return this.userModel.findOne({
            where: {
                nip,
            },
        });
    }

    async remove(nip: number): Promise<void> {
        console.log('acessou remove');

        const user = await this.findOne(nip);
        await user.destroy();
    }


    // async createMany() {
    //     try {
    //         await this.sequelize.transaction(async (t) => {
    //             await this.userModel.bulkCreate(this.userMock, { transaction: t });
    //         });
    //     } catch (err) {
    //         console.log(`Erro: ${err}`);
    //     }
    // }
}
