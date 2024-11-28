import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator'

const IS_NOT_EMPTY_MSG = (attr) => `O atributo ${attr} é obrigatório`
const IS_STRING_MSG = (attr) => `O atributo ${attr} deve ser uma string`
const IS_BOOL_MSG = (attr) => `O atributo ${attr} deve ser um booleano (verdadeiro ou falso)`
const IS_EMPTY_MSG = (attr) => `O atributo ${attr} deve ser vazio`

export class CreateUserPermissionDTO {

    @ApiProperty({})
    idPermission?: number;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('nomeDivision') })
    @IsNumber({}, { message: 'idSubSession deve ser um número.' })
    idSubSession: number;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('nip') })
    @IsString({ message: IS_STRING_MSG('nip') })
    nip: string;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('nomeDivision') })
    @IsNumber({}, { message: 'permission deve ser um número.' })
    permission: number;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('status') })
    @IsBoolean({ message: 'permission deve ser um número.' })
    status: boolean;

    @ApiProperty({})
    @IsEmpty({ message: IS_EMPTY_MSG('createdAt') })
    createdAt: Date;

    @ApiProperty({})
    @IsEmpty({ message: IS_EMPTY_MSG('updatedAt') })
    updatedAt: Date

    @ApiProperty({})
    expireAt?: Date
}
