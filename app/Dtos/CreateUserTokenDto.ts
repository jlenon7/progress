import { Field, InputType } from '@nestjs/graphql'
import { TokenTypeEnum } from '../Enums/TokenTypeEnum'

@InputType()
export class CreateUserTokenDto {
  @Field()
  readonly token: string

  @Field()
  readonly type: TokenTypeEnum

  @Field()
  readonly expires_in: string

  @Field()
  readonly user_id: string

  @Field()
  readonly is_revoked: boolean
}
