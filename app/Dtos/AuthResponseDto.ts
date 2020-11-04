import { User } from '../Models/User'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthResponseDto {
  @Field()
  user: User

  @Field()
  token: string
}
