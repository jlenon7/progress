import User from '../../models/user.entity'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export default class AuthResponse {
  @Field()
  user: User

  @Field()
  token: string
}
