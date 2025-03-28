import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from 'class-validator'

const IS_NOT_EMPTY_MSG = (attr) => `O atributo '${attr}' é obrigatório`
const IS_STRING_MSG = (attr) => `O atributo '${attr}' deve ser uma string`
const IS_EMPTY_MSG = (attr) => `O atributo '${attr}' deve ser vazio`

export class CreateUserDto {
    @ApiProperty({
        description: 'Número de Identicação Pessoal (NIP) do usuário.',
        example: '12345678',
        minLength: 8,
        maxLength: 8
    })
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('nip') })
    @IsString({ message: IS_STRING_MSG('nip') })
    nip: string;

    @ApiProperty({
        description: 'ID da patente do usuário.',
        example: 1,
        maxLength: 19
    })
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('idPatent') })
    idPatent: number;

    @ApiPropertyOptional({
        description: 'Nome de guerra do usuário (opcional).',
        example: 'Brito'
    })
    @IsString({ message: IS_STRING_MSG('warName') })
    warName?: string;

    @ApiProperty({
        description: 'Primeiro nome do usuário.',
        example: 'Carlos'
    })
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('firstName') })
    @IsString({ message: IS_STRING_MSG('firstName') })
    firstName: string;

    @ApiProperty({
        description: 'Último nome do usuário.',
        example: 'Daniel'
    })
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('lastName') })
    @IsString({ message: IS_STRING_MSG('lastName') })
    lastName: string;

    @ApiProperty({
        description: 'Cargo do usuário',
        example: 'user',
        enum: ['root', 'userAdm', 'contentAdm', 'user']
    })
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('role') })
    @IsString({ message: IS_STRING_MSG('role') })
    role: string;

    @ApiProperty({
        description: 'Status do cadastro do usuário.',
        example: 'active',
        enum: ['active', 'inactive', 'password_reset']
    })
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('status') })
    @IsString({ message: IS_STRING_MSG('status') })
    status: string;

    @ApiProperty({
        description: 'Permissões do usuário.',
        example: 'write, read, delete',
        examples: {
            write: 'Permite criar ou atualizar informações.',
            read: 'Permite a leitura de informações.',
            delete: 'Permite deletar informações.'
        }
    })
    @IsNotEmpty({ message: `${IS_NOT_EMPTY_MSG('permission')}. Valor padrão deve ser 'user'` })
    @IsString({ message: IS_STRING_MSG('permission') })
    permission: string;

    @ApiProperty({
        description: 'Senha do usuário.',
        example: '@HNBra1234'
    })
    @IsNotEmpty({ message: IS_NOT_EMPTY_MSG('password') })
    @IsString({ message: IS_STRING_MSG('password') })
    password: string;

    @ApiPropertyOptional({
        description: 'Email pessoal do usuário (opcional).',
        example: 'usuario@email.com'
    })
    @IsString({ message: IS_STRING_MSG('emailPersonal') })
    emailPersonal?: string;

    @ApiPropertyOptional({
        description: 'Email de Marinha do usuário (opcional).',
        example: 'usuario@marinha.milbr'
    })
    @IsString({ message: IS_STRING_MSG('emailMb') })
    emailMb?: string;

    @ApiPropertyOptional({
        description: 'Número de contato do usuário (opcional).',
        example: '61988776655'
    })
    @IsString({ message: IS_STRING_MSG('contactNumber') })
    contactNumber?: string;
}
