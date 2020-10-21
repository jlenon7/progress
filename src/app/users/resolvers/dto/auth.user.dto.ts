import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export default class AuthUserDto {
  @IsNotEmpty({
    message: 'Informe um endereço de email',
  })
  @IsString({
    message: 'Informe um endereço de email válido',
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
}
