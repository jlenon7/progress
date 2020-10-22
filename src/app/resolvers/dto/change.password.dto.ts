import { Field, InputType } from '@nestjs/graphql'
import { IsString, MinLength, IsNotEmpty, Equals } from 'class-validator'

@InputType()
export default class ResetPasswordDto {
  @IsNotEmpty({
    message: 'Informe um token',
  })
  @IsString({
    message: 'Informe um token válido',
  })
  @Field()
  readonly token: string

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
