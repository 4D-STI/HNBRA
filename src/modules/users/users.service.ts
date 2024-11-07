import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from '../../repository/models/user.model'
import { SearchUserDto } from './dto/search-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: typeof users
  ) { }


  async create(createUserDto: CreateUserDto) {
    // pesquisar nip do usuario antes de criar
    const userToCreate = await this.searchUsers({ nip: createUserDto.nip })

    console.log(userToCreate);


    if (userToCreate.length !== 0) return `Nip: ${createUserDto.nip} já está cadastrado!`

    try {
      await this.userRepository.create(createUserDto)
    } catch (error) {
      throw new Error(`Erro ao criar usuario \r Erro: ${error}`)
    }
    return `Usuário criado \r${JSON.stringify(createUserDto)}`;
  }


  async searchUsers(searchDto: SearchUserDto) {
    const where: any = {};

    for (const [key, value] of Object.entries(searchDto)) {
      if (value) {
        where[key] = {
          [Op.iLike]: `%${value}%` // Case-insensitive LIKE comparison
        };
      }
    }

    return await this.userRepository.findAll({ where });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
