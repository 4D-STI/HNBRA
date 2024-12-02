// import { EntityRepository, Repository } from 'typeorm';
// // import { users } from '../repository/models/user.model';
// import { Users } from '../../repository/models/user.model';
// import { Injectable } from '@nestjs/common';

// @EntityRepository(Users)
// @Injectable()
// export class UsersRepository extends Repository<Users> {

//     // Método para buscar um usuário por NIP
//     async findByNip(nip: string): Promise<Users | undefined> {
//         return this.findOne({ where: { nip } });
//     }

//     // Método para buscar um usuário por email
//     async findByEmail(email: string): Promise<Users | undefined> {
//         return this.findOne({ where: [{ emailPersonal: email }, { emailMb: email }] });
//     }

//     // Método para criar um novo usuário
//     async createUser(nip: string, emailPersonal: string, emailMb: string, password: string): Promise<Users> {
//         const user = this.create({ nip, emailPersonal, emailMb, password });
//         return this.save(user);
//     }

//     // Método para verificar se o email já está registrado
//     async emailExists(email: string): Promise<boolean> {
//         const user = await this.findByEmail(email);
//         return !!user;
//     }

// }
