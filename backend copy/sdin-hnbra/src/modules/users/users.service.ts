import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { Op } from 'sequelize';
import { users } from '../../repository/models/user.model'
import { CreateUserDto } from '../../contracts/Dtos/create-user.dto';
import { UpdateUserDto } from '../../contracts/Dtos/update-user.dto';
import { SearchUserDto } from '../../contracts/Dtos/search-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: typeof users
  ) { }


  async create(createUserDto: CreateUserDto) {
    // pesquisar nip do usuario antes de criar
    const userToCreate = await this.searchUsers({ nip: createUserDto.nip })

    if (userToCreate[0]) return `Nip: ${createUserDto.nip} já está cadastrado!`

    try {
      await this.userRepository.create(createUserDto)
    } catch (e) {
      throw new Error(`Erro ao criar usuario \r Erro: ${e}`)
    }
    return `Usuário criado \r${JSON.stringify(createUserDto)}`;
  }


  async searchUsers(searchDto: SearchUserDto): Promise<any> {
    const where: any = {};
    const message = `Usuário inexistente!
    Atributos pesquisados: ${Object.keys(where).map(key => key.toUpperCase())}`

    for (const [key, value] of Object.entries(searchDto)) {
      if (value) {
        where[key] = {
          [Op.iLike]: `%${value}%` // Case-insensitive LIKE comparison
        };
      }
    }

    const user = await this.userRepository.findAll({ where })

    if (user.length === 0) return { error: true, message }

    return user;
  }

  async update(nip: string, updateUserDto: UpdateUserDto) {
    // pesquisar nip do usuario antes de atualizar
    const userToUpdate = await this.searchUsers({ nip })

    if (userToUpdate.length === 0) return `Usuário inexistente. NIP: ${nip} não encontrado!`
    console.log('Usuario que sera atualizado: ', userToUpdate);
    console.log('Informações a sere, atualizadas: ', updateUserDto);




    try {
      await this.userRepository.update(updateUserDto, { where: { nip } })
    } catch (e) {
      throw new Error(`Erro ao atualizar usuário: ${e}`)
    }
    return `Usuário NIP: ${nip} foi atualizado com sucesso!`;
  }

  async remove(nip: string) {
    // pesquisar nip do usuario antes de remover
    const userToDelete = await this.searchUsers({ nip })

    // Caso usuário inexistente
    if (userToDelete.length === 0) return `Usuário inexistente. NIP: ${nip} não encontrado!`

    try {
      await this.userRepository.destroy({
        where: { nip }
      })
    } catch (e) {
      throw new Error(`Erro ao remover usuário: ${e}`)
    }
    return `Usuário NIP: ${nip} foi removido!`;
  }
}
