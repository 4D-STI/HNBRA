import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Op } from 'sequelize';
import { Users } from '../../repository/models/user.model'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDtoResponse } from './dto/create-user-response.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Patent } from 'src/repository/models/patent.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: typeof Users,

    @InjectModel(Patent)
    private readonly patentRepository: typeof Patent,
  ) { }


  async create(createUserDto: CreateUserDto) {
    // Pesquisar NIP do usuário antes de criar
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

    // Criptografar a senha antes de salvar no banco de dados
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // Atualiza a senha no DTO para salvar no banco
    createUserDto.password = hashedPassword;

    try {
      // Criar o usuário no banco de dados
      await this.userRepository.create(createUserDto);
    } catch (e) {
      throw new Error(`Erro ao criar usuário. Erro: ${e}`);
    }

    // Retornar o usuário recém-criado
    const userCreate = this.userRepository.findOne({ where: { nip: createUserDto.nip } });
    // const patent = this.patentRepository.findOne({ where: { idPatent: createUserDto.idPatent } })
    // console.log('--------------------------------------', (await patent).patent)
    const response = this.createUserResponse(await userCreate)
    return response;
  }



  async createUserResponse(createUserDto: Users): Promise<CreateUserDtoResponse> {
    // Busca os dados do usuário e da patente em paralelo para otimizar performance
    const [user, patent] = await Promise.all([
      this.userRepository.findOne({ where: { nip: createUserDto.nip } }),
      this.patentRepository.findOne({ where: { idPatent: createUserDto.idPatent } }),
    ]);

    // Monta a resposta com os dados obtidos
    const response: CreateUserDtoResponse = {
      nip: user?.nip || null,
      patent: patent?.patent || null,
      warName: user?.warName || null,
      firstName: user?.firstName || null,
      lastName: user?.lastName || null,
      role: user?.role || null,
      status: user?.status || null,
      permission: user?.permission || null,
      password: user?.password || null,
      emailPersonal: user?.emailPersonal || null,
      emailMb: user?.emailMb || null,
      contactNumber: user?.contactNumber || null,
    };

    return response;
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

    const response = this.createUserResponse(await user)
    return response;

    // return user;
  }

  async findByEmail(emailPersonal: string): Promise<any | null> {
    return this.userRepository.findOne({ where: { emailPersonal } });
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
    const userCreate = this.userRepository.findOne({ where: { nip: nip } });
    // return `Usuário NIP: ${nip} foi atualizado com sucesso!`;
    const response = this.createUserResponse(await userCreate)
    return response;


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
