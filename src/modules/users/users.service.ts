import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from '../../repository/models/user.model'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: typeof users
  ) { }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<users[] | string> {
    const data = await this.userRepository.findAll<users>();
    return data

  }

  async findOne(nip: string) {
    console.log(`NIP SERVICE = ${nip}`);
    console.log(typeof nip);


    const data = await this.userRepository.findOne({
      where: { nip }
    });

    return data
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
