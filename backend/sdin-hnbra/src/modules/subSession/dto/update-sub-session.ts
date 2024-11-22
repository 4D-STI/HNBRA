import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from 'class-validator'

const IS_NOT_EMPTY_MSG = (attr) => `O atributo ${attr} é obrigatório`
const IS_STRING_MSG = (attr) => `O atributo ${attr} deve ser uma string`
const IS_BOOL_MSG = (attr) => `O atributo ${attr} deve ser um booleano (verdadeiro ou falso)`
const IS_EMPTY_MSG = (attr) => `O atributo ${attr} deve ser vazio`

export class UpdateSubSessionDto {

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('idSubSession') })
    idSubSession: number;

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('nameSubSession') })
    @IsString({ message: IS_STRING_MSG('nameSubSession') })
    nameSubSession: string;

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('idSession') })
    idSession: number;

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('status') })
    @IsString({ message: IS_STRING_MSG('status') })
    status: string;

    @IsEmpty({ message: IS_EMPTY_MSG('createdAt') })
    createdAt: Date;
    @IsEmpty({ message: IS_EMPTY_MSG('updatedAt') })
    updatedAt: Date
}
