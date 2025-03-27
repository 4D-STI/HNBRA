import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Users } from 'src/repository/models/user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Criar usuário' })
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso', type: Users }) // Documenta a resposta de criação
  @ApiBadRequestResponse({ description: 'Dados inválidos para criar o usuário' })
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


  @Get('login')
  // SWAGGER NAO ACEITA BODY PARA REQUIÇÃO GET HTTP(LOGIN IMPLEMENTADO NO AUTH SERVICE)
  getLogin(@Body() loginUser: LoginUserDto) {
    return this.usersService.searchUsersLogin(loginUser);
  }


  // @Get()
  // readWithParam(
  //   @Param(':any') any: any
  // ) {
  //   console.log('param -> ', any);

  //   return `Esta rota não aceita "PARAM". Realize a busca por "QUERY"`

  // }

  @Patch(':nip')
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Param('nip') nip: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() res,
  ) {
    console.log('sdadadas')
    return this.usersService.update(nip, updateUserDto, res.user.nip);
  }

  @Delete(':nip')
  @UseGuards(JwtAuthGuard)
  remove(@Param('nip') nip: string, @Request() res) {
    return this.usersService.remove(nip, res.user.nip);
  }
}
