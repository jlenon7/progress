import { Field, InputType } from '@nestjs/graphql'
import { IsString, MaxLength, IsNotEmpty, IsEmail } from 'class-validator'

@InputType()
export class AuthUserDto {
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
  @Field()
  readonly password: string
}
