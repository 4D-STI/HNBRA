import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  getUsers(
    @Query() searchDto: SearchUserDto
    // @Param() any: any
  ) {
    console.log('param -> ');

    // if (any) return `Esta rota não aceita "PARAM". Realize a busca por "QUERY"`

    return this.usersService.searchUsers(searchDto)
  }


  // @Get('login')
  //SWAGGER NAO ACEITA BODY PARA REQUIÇÃO GET HTTP(LOGIN IMPLEMENTADO NO AUTH SERVICE)
  // getLogin(@Body() loginUser: LoginUserDto) {
  //   return this.usersService.searchUsersLogin(loginUser);
  // }


  // @Get()
  // readWithParam(
  //   @Param(':any') any: any
  // ) {
  //   console.log('param -> ', any);

  //   return `Esta rota não aceita "PARAM". Realize a busca por "QUERY"`

  // }

  @Patch(':nip')
  updateUser(
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
