import { Field, InputType } from '@nestjs/graphql'

@InputType()
export default class AuthUserDto {
  @Field()
  readonly email: string

  @Field()
  readonly password: string
}
