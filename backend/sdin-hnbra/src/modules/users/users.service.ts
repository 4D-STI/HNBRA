import { Injectable, Inject, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Op } from 'sequelize';
import { Users } from '../../repository/models/user.model'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersValidator } from './validator/user.service.validator';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersValidator: UsersValidator,

    @Inject('USERS_REPOSITORY')
    private userRepository: typeof Users,
  ) { }


  async create(createUserDto: CreateUserDto) {
    // Pesquisar NIP do usuário antes de criar
    await this.usersValidator.validateCreateUser(createUserDto);

    // Criptografar a senha antes de salvar no banco de dados
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // Atualiza a senha no DTO para salvar no banco
    createUserDto.password = await this.usersValidator.passwordHash(createUserDto.password);

    try {
      // Criar o usuário no banco de dados
      await this.userRepository.create(createUserDto);
    } catch (e) {
      throw new Error(`Erro ao criar usuário. Erro: ${e}`);
    }

    // Retornar o usuário recém-criado
    const userCreate = this.userRepository.findOne({ where: { nip: createUserDto.nip } });
    return this.usersValidator.createUserResponse(await userCreate);
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
    const user = await this.usersValidator.findByNip(searchDto.nip);
    if (!user) {
      // Usuário não encontrado
      throw new UnauthorizedException('Invalid credentials');
    }
    // Usar await para esperar a resolução da Promise
    const isPasswordValid = await bcrypt.compare(searchDto.password, user.password);

    if (isPasswordValid) {
      console.log("Login validado com sucesso!")
      return user;
    }
    return null;
  }

  async findByEmail(emailPersonal: string): Promise<any | null> {
    return this.userRepository.findOne({ where: { emailPersonal } });
  }



  // async findByStatus(status: string): Promise<users[]> {

  //   return users.findAll({ where: { status } });
  // }



  async update(nip: string, updateUserDto: UpdateUserDto) {
    // pesquisar nip do usuario antes de atualizar
    await this.usersValidator.valdiateUpdate(nip, updateUserDto)

    try {
      await this.userRepository.update(updateUserDto, { where: { nip } })
    } catch (e) {
      throw new Error(`Erro ao atualizar usuário: ${e}`)
    }
    const userCreate = this.userRepository.findOne({ where: { nip: nip } });
    // return `Usuário NIP: ${nip} foi atualizado com sucesso!`;
    return this.usersValidator.createUserResponse(await userCreate);
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
