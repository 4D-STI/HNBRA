// // user.repository.ts
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { User } from '../../repository/models/user.model';
// import { Model } from 'sequelize-typescript';

// @Injectable()
// export class
//     UsersRepository {
//     constructor(@InjectModel(User) private userRepository: typeof Model<User>) { }

//     async findAll(): Promise<User[] | null> {
//         return this.userRepository.findAll();
//         // return null

//     }

//     // Outros métodos para CRUD
// }
