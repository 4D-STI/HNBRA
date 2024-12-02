import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const IS_EMPTY_MSG = (attr) => `O atributo ${attr} não pode ser atualizado e deve ser vazio`

export class LoginUserDto extends PartialType(CreateUserDto) {
    // @IsEmpty({ message: IS_EMPTY_MSG('nip') })
    @ApiProperty({})
    nip: string;

    // @IsEmpty({ message: IS_EMPTY_MSG('nip') })
    @ApiProperty({})
    password: string;
}
