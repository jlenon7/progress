import User from '../models/user.entity'
import { Injectable } from '@nestjs/common'
import StatusEnum from '../../database/ENUM/status.enum'
import UserRepository from '../repositories/user.repository'
import TokenStatusEnum from '../../database/ENUM/token-status.enum'
import UserTokenRepository from '../repositories/user.token.repository'

@Injectable()
export default class ConfirmUserService {
  constructor(
    private userRepository: UserRepository,
    private userTokenRepository: UserTokenRepository,
  ) {}

  public async execute(token: string): Promise<User> {
    const userToken = await this.userTokenRepository.getUserToken(token)

    const user = await this.userRepository.getUser(userToken.user_id)
    user.status = StatusEnum.APPROVED

    userToken.is_revoked = true
    userToken.revoked_at = new Date()
    userToken.status = TokenStatusEnum.REVOKED

    await this.userTokenRepository.storage(userToken)

    return this.userRepository.storage(user)
  }
}
