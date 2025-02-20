import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator'

const IS_NOT_EMPTY_MSG = (attr) => `O atributo ${attr} é obrigatório`
const IS_STRING_MSG = (attr) => `O atributo ${attr} deve ser uma string`
const IS_BOOL_MSG = (attr) => `O atributo ${attr} deve ser um booleano (verdadeiro ou falso)`
const IS_EMPTY_MSG = (attr) => `O atributo ${attr} deve ser vazio`

export class CreateInformationDTO {

    // @ApiProperty({})
    // idInformation?: number;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('nameDepartament') })
    @IsString({ message: IS_STRING_MSG('nameDepartament') })
    nameDepartament: string;

    @ApiProperty({})
    nip: string;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('description') })
    @IsString({ message: IS_STRING_MSG('description') })
    description: string;

    @ApiProperty({})
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('status') })
    @IsString({ message: IS_STRING_MSG('status') })
    status: string;

    @ApiProperty({})
    InitAt?: Date

    @ApiProperty({})
    expireAt?: Date

    @ApiProperty({})
    @IsEmpty({ message: IS_EMPTY_MSG('createdAt') })
    createdAt: Date;

    @ApiProperty({})
    @IsEmpty({ message: IS_EMPTY_MSG('updatedAt') })
    updatedAt: Date

}
