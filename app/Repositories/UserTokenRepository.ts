import { UserToken } from '../Models/UserToken'
import { EntityRepository, Repository } from 'typeorm'
import { TokenTypeEnum } from '../Enums/TokenTypeEnum'
import { TokenStatusEnum } from '../Enums/TokenStatusEnum'
import { CreateUserTokenDto } from '../Dtos/CreateUserTokenDto'
import { UnauthorizedException } from '@nestjs/common'

@EntityRepository(UserToken)
export class UserTokenRepository extends Repository<UserToken> {
  public async getUserTokenByType(
    user_id: string,
    type: TokenTypeEnum,
  ): Promise<UserToken> {
    return this.findOne({
      type,
      user_id,
      is_revoked: false,
      status: TokenStatusEnum.CREATED,
    })
  }

  public async getUserToken(token: string): Promise<UserToken> {
    return this.findOne({
      token,
      is_revoked: false,
      status: TokenStatusEnum.CREATED,
    })
  }

  public async createOrUpdateUserToken(
    dto: CreateUserTokenDto,
  ): Promise<UserToken> {
    let userToken = await this.findOne({
      user_id: dto.user_id,
      type: dto.type,
    })

    if (userToken) {
      userToken.token = dto.token
      userToken.expires_in = dto.expires_in
      userToken.is_revoked = dto.is_revoked

      await this.storage(userToken)
    }

    userToken = await this.create(dto)

    return this.storage(userToken)
  }

  public async createUserToken(dto: CreateUserTokenDto): Promise<UserToken> {
    const verifyDuplicity = await this.findOne({
      user_id: dto.user_id,
      type: dto.type,
    })

    if (verifyDuplicity) {
      throw new UnauthorizedException(
        'TOKEN_ALREADY_STORED',
        'User token already stored for this user, please update the old one.',
      )
    }

    const userToken = await this.create(dto)

    return this.storage(userToken)
  }

  public async storage(userToken: UserToken): Promise<UserToken> {
    return this.save(userToken)
  }
}
