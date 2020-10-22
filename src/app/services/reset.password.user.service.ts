import User from '../models/user.entity'
import { ModuleRef } from '@nestjs/core'
import HashService from './hash.service'
import { Injectable } from '@nestjs/common'
import UserRepository from '../repositories/user.repository'
import TokenStatusEnum from '../../database/ENUM/token-status.enum'
import UserTokenRepository from '../repositories/user.token.repository'

@Injectable()
export default class ResetPasswordUserService {
  constructor(
    private moduleRef: ModuleRef,
    private hashService: HashService,
    private userRepository: UserRepository,
    private userTokenRepository: UserTokenRepository,
  ) {}

  public async execute(token: string, password: string): Promise<User> {
    const userToken = await this.userTokenRepository.getUserToken(token)
    const user = await this.userRepository.getUser(userToken.id)

    user.password = await this.hashService.generateHash(password)

    userToken.is_revoked = true
    userToken.revoked_at = new Date()
    userToken.status = TokenStatusEnum.REVOKED

    await this.userTokenRepository.storage(userToken)

    return this.userRepository.storage(user)
  }
}
