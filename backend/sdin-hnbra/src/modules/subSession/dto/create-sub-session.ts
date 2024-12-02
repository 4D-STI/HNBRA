import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from 'class-validator'

export const IS_NOT_EMPTY_MSG = (attr) => `O atributo ${attr} é obrigatório`
const IS_STRING_MSG = (attr) => `O atributo ${attr} deve ser uma string`
const IS_BOOL_MSG = (attr) => `O atributo ${attr} deve ser um booleano (verdadeiro ou falso)`
const IS_EMPTY_MSG = (attr) => `O atributo ${attr} deve ser vazio`

export class CreateSubSessionDto {

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('nameDivison') })
    @IsString({ message: IS_STRING_MSG('nameDivison') })
    nameSubSession: string;

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('idDivision') })
    idSession: number;

    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('status') })
    @IsString({ message: IS_STRING_MSG('status') })
    status: string;

}
