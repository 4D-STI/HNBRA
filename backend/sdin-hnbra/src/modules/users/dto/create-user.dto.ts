import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from 'class-validator'

const IS_NOT_EMPTY_MSG = (attr) => `O atributo ${attr} é obrigatório`
const IS_STRING_MSG = (attr) => `O atributo ${attr} deve ser uma string`
const IS_EMPTY_MSG = (attr) => `O atributo ${attr} deve ser vazio`

export class CreateUserDto {
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('nip') })
    @IsString({ message: IS_STRING_MSG('nip') })
    nip: string;

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('idPatent') })
    idPatent: number;

    @IsString({ message: IS_STRING_MSG('warName') })
    warName?: string;

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('firstName') })
    @IsString({ message: IS_STRING_MSG('firstName') })
    firstName: string;

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('lastName') })
    @IsString({ message: IS_STRING_MSG('lastName') })
    lastName: string;

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('role') })
    @IsString({ message: IS_STRING_MSG('role') })
    role: string;

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('status') })
    @IsString({ message: IS_STRING_MSG('status') })
    status: string;

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('permission') })
    @IsString({ message: IS_STRING_MSG('permission') })
    permission: string;

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('password') })
    @IsString({ message: IS_STRING_MSG('password') })
    password: string;

    @IsString({ message: IS_STRING_MSG('emailPersonal') })
    emailPersonal?: string;

    @IsString({ message: IS_STRING_MSG('emailMb') })
    emailMb?: string;

    @IsString({ message: IS_STRING_MSG('contactNumber') })
    contactNumber?: string;

    @IsEmpty({ message: IS_EMPTY_MSG('createdAt') })
    createdAt: Date;
    @IsEmpty({ message: IS_EMPTY_MSG('updatedAt') })
    updatedAt: Date
}
