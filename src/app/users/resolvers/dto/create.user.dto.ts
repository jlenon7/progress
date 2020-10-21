import {
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsNotEmpty,
  Equals,
} from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export default class CreateUserDto {
  @IsNotEmpty({
    message: 'Informe um nome',
  })
  @MaxLength(32, {
    message: 'O nome deve ter no máximo 32 caracteres',
  })
  @Field()
  readonly name: string

  @IsNotEmpty({
    message: 'Informe um endereço de email',
  })
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  @MaxLength(200, {
    message: 'O endereço de email deve ter menos de 200 caracteres',
  })
  @Field()
  readonly email: string

  @IsNotEmpty({
    message: 'Informe uma senha',
  })
  @IsString({
    message: 'Informe uma senha válida',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  @Field()
  readonly password: string

  @IsNotEmpty({
    message: 'Informe uma confirmação de senha',
  })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
  })
  @Equals('password', {
    message: 'Confirmação de senha deve ser igual a senha',
  })
  @Field()
  readonly password_confirmation?: string
}
