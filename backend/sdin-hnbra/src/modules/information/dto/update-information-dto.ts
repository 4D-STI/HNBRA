import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator'

const IS_NOT_EMPTY_MSG = (attr) => `O atributo ${attr} é obrigatório`
const IS_STRING_MSG = (attr) => `O atributo ${attr} deve ser uma string`
const IS_EMPTY_MSG = (attr) => `O atributo ${attr} deve ser vazio`

export class UpdateInformationDTO {

    @ApiProperty({})
    idInformation?: number;

    @ApiProperty({})
    nip?: string;

    @ApiProperty({})
    nameDepartament?: string;

    @ApiProperty({})
    description?: string;

    @ApiProperty({})
    @IsString({ message: IS_STRING_MSG('status') })
    status?: string;

    @ApiProperty({})
    InitAt?: Date

    @ApiProperty({})
    expireAt?: Date

}
