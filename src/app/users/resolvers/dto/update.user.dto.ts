import { Field, InputType } from '@nestjs/graphql'

@InputType()
export default class UpdateUserDto {
  @Field()
  readonly name: string

  @Field()
  readonly email: string

  @Field({ nullable: true })
  readonly password?: string

  @Field({ nullable: true })
  readonly old_password?: string
}
