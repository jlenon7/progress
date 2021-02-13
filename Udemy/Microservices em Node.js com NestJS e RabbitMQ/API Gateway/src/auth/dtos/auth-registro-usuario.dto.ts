import { IsString, IsEmail, Matches, IsMobilePhone } from "class-validator"

export class AuthRegistroUsuarioDto {

    @IsString()
    nome: string

    @IsEmail()
    email: string

    /*
        - Minimo 8 caracteres
        - uma letra maiuscula
        - uma letra minuscula
        - um numero
    */
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {message: 'senha inválida' })
    senha: string

    @IsMobilePhone('pt-BR')
    telefoneCelular: string

}