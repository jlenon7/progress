import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import UserToken from '../models/user.token.entity'
import { EntityRepository, Repository } from 'typeorm'
import TokenTypeEnum from '../../../database/ENUM/token-type.enum'
import TokenStatusEnum from '../../../database/ENUM/token-status.enum'
import CreateUserTokenDto from '../resolvers/dto/create.user.token.dto'

@EntityRepository(UserToken)
export default class UserTokenRepository extends Repository<UserToken> {
  public async getUserTokenByType(
    user_id: string,
    type: TokenTypeEnum,
  ): Promise<UserToken> {
    const userToken = await this.findOne({
      type,
      user_id,
      is_revoked: false,
      status: TokenStatusEnum.CREATED,
    })

    if (!userToken) {
      throw new NotFoundException(
        'USER_TOKEN_NOT_FOUND',
        'User token not found with this id',
      )
    }

    return userToken
  }

  public async getUserToken(token: string): Promise<UserToken> {
    const userToken = await this.findOne({
      token,
      is_revoked: false,
      status: TokenStatusEnum.CREATED,
    })

    if (!userToken) {
      throw new NotFoundException(
        'USER_TOKEN_NOT_FOUND',
        'User token not found with this id',
      )
    }

    return userToken
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
