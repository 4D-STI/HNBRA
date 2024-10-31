import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import createUsersDto from './dto/create-users.dto'
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body()
    createUserDto: createUsersDto) {
        console.log(`Criar usuario ${createUserDto}`);
        // return this.usersService.create(createUserDto);
        return true
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':nip')
    findOne(@Param('nip') nip: number) {
        return this.usersService.findOne(+nip);
    }

    @Put(':nip')
    update(@Param('nip') nip: number, @Body() createUsersDto: createUsersDto) {
        console.log(`Autalizar NIP ${nip} \r Usuário: ${createUsersDto}`);

        return true
    }
    // @Put(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersFervice.update(+id,
    //         updateUserDto);
    // }

    @Delete(':nip')
    remove(@Param('nip') nip: number) {
        return this.usersService.remove(nip);
    }
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.usersService.remove(+id);
    // }
}
