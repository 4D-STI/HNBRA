import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Op } from 'sequelize';
import { users } from '../../repository/models/user.model'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: typeof users
  ) { }


  async create(createUserDto: CreateUserDto) {
    // pesquisar nip do usuario antes de criar
    const user = await this.userRepository.findOne({
      where: {
        [Op.or]: [
          { nip: createUserDto.nip },
          { emailPersonal: createUserDto.emailPersonal },
          { emailMb: createUserDto.emailMb },
        ],
      },
    });

    if (user) {
      if (user.nip === createUserDto.nip) {
        throw new BadRequestException(`NIP: ${createUserDto.nip} já está cadastrado!`);
      }
      if (user.emailPersonal === createUserDto.emailPersonal) {
        throw new BadRequestException(`emailPessoa: ${createUserDto.emailPersonal} já está cadastrado!`);
      }
      if (user.emailMb === createUserDto.emailMb) {
        throw new BadRequestException(`emailMb: ${createUserDto.emailMb} já está cadastrado!`);
      }
    }

    try {
      await this.userRepository.create(createUserDto)
    } catch (e) {
      throw new Error(`Erro ao criar usuario \r Erro: ${e}`)
    }
    // return `Usuário criado \r${JSON.stringify(createUserDto)}`;
    // return JSON.stringify(createUserDto, null, 2);
    return this.userRepository.findOne({ where: { nip: createUserDto.nip } })
  }


  async searchUsers(searchDto: SearchUserDto): Promise<any> {
    const where: any = {};
    const message = `Usuário inexistente!
    Atributos pesquisados: ${Object.keys(where).map(key => key.toUpperCase())}`

    // searchDto.status.toUpperCase()

    for (const [key, value] of Object.entries(searchDto)) {
      if (value) {
        where[key] = {
          [Op.iLike]: `%${value}%` // Case-insensitive LIKE comparison
        };
      }
    }

    const user = await this.userRepository.findAll({ where })

    if (user.length === 0) {
      throw new BadRequestException(message)
    }

    return user;
  }


  async searchUsersLogin(searchDto: LoginUserDto): Promise<any> {
    const { nip, password } = searchDto;

    if (!nip || !password) {
      throw new BadRequestException('Login e senha são obrigatórios.');
    }

    const user = await this.userRepository.findOne({
      where: {
        [Op.and]: [
          { nip: { [Op.eq]: nip } },
          { password: { [Op.eq]: password } },
        ],
      },
    });

    if (!user) {
      throw new BadRequestException(
        `Usuário inexistente! Login informado: ${nip} ou senha incorreta!`,
      );
    }

    return user;
  }





  // async findByStatus(status: string): Promise<users[]> {

  //   return users.findAll({ where: { status } });
  // }



  async update(nip: string, updateUserDto: UpdateUserDto) {
    // pesquisar nip do usuario antes de atualizar
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException('O corpo da requisição não pode estar vazio');
    }
    const user = await this.userRepository.findOne({ where: { nip } });
    if (!user) {
      throw new BadRequestException(`Usuário inexistente. NIP: ${nip} não encontrado!`)
    }
    const userToUpdate = await this.searchUsers({ nip })

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
    if (userToDelete.length === 0) {
      throw new BadRequestException(`Usuário inexistente. NIP: ${nip} não encontrado!`)
    }
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
