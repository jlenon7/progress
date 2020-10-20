import { Field, InputType } from '@nestjs/graphql'
import TokenTypeEnum from '../../../../database/ENUM/token-type.enum'

@InputType()
export default class CreateUserTokenDto {
  @Field()
  readonly token: string

  @Field()
  readonly type: TokenTypeEnum

  @Field()
  readonly expires_in: string

  @Field()
  readonly user_id: string
}
