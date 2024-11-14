import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  read(
    @Query() searchDto: SearchUserDto,
    @Param() any: any
  ) {
    console.log('param -> ', any);

    if (any) return `Esta rota não aceita "PARAM". Realize a busca por "QUERY"`

    return this.usersService.searchUsers(searchDto)
  }

  @Get('any')
  readWithParam(
    @Param(':any') any: any
  ) {
    console.log('param -> ', any);

    return `Esta rota não aceita "PARAM". Realize a busca por "QUERY"`

  }

  @Patch(':nip')
  update(
    @Param('nip') nip: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(nip, updateUserDto);
  }

  @Delete(':nip')
  remove(@Param('nip') nip: string) {
    return this.usersService.remove(nip);
  }
}
