import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from 'class-validator'

const IS_NOT_EMPTY_MSG = (attr) => `O atributo ${attr} é obrigatório`
const IS_STRING_MSG = (attr) => `O atributo ${attr} deve ser uma string`
const IS_EMPTY_MSG = (attr) => `O atributo ${attr} deve ser vazio`

export class CreateUserDto {
    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('nip') })
    @IsString({ message: IS_STRING_MSG('nip') })
    nip: string;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('idPatent') })
    idPatent: number;

    @ApiProperty({})
    @IsString({ message: IS_STRING_MSG('warName') })
    warName?: string;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('firstName') })
    @IsString({ message: IS_STRING_MSG('firstName') })
    firstName: string;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('lastName') })
    @IsString({ message: IS_STRING_MSG('lastName') })
    lastName: string;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('role') })
    @IsString({ message: IS_STRING_MSG('role') })
    role: string;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('status') })
    @IsString({ message: IS_STRING_MSG('status') })
    status: string;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('permission') })
    @IsString({ message: IS_STRING_MSG('permission') })
    permission: string;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('password') })
    @IsString({ message: IS_STRING_MSG('password') })
    password: string;

    @ApiProperty({})
    @IsString({ message: IS_STRING_MSG('emailPersonal') })
    emailPersonal?: string;

    @ApiProperty({})
    @IsString({ message: IS_STRING_MSG('emailMb') })
    emailMb?: string;

    @ApiProperty({})
    @IsString({ message: IS_STRING_MSG('contactNumber') })
    contactNumber?: string;
}
