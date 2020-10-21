import { Field, InputType } from '@nestjs/graphql'
import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

@InputType()
export default class UpdateUserDto {
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

  @IsString({
    message: 'Informe uma senha válida',
  })
  @Field({ nullable: true })
  readonly password?: string

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

  @IsString({
    message: 'Informe uma senha válida',
  })
  @Field({ nullable: true })
  readonly old_password?: string
}
