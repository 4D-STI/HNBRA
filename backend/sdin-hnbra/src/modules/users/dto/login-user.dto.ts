import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmpty } from 'class-validator';

const IS_EMPTY_MSG = (attr) => `O atributo ${attr} não pode ser atualizado e deve ser vazio`

export class LoginUserDto extends PartialType(CreateUserDto) {
    // @IsEmpty({ message: IS_EMPTY_MSG('nip') })
    nip: string;

    // @IsEmpty({ message: IS_EMPTY_MSG('nip') })
    password: string;
}
