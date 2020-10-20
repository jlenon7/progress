import { Field, InputType } from '@nestjs/graphql'

@InputType()
export default class CreateUserDto {
  @Field()
  readonly name: string

  @Field()
  readonly email: string

  @Field()
  readonly password: string
}
