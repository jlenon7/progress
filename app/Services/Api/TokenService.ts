import {
  ApiRequestContract,
  GuardBaseService,
  PaginationContract,
  Token,
  random,
} from '@secjs/core'
import { CreateTokenDto } from 'app/Contracts/Dtos/CreateTokenDto'
import { TokenRepository } from 'app/Repositories/TokenRepository'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ApplicationContract } from 'app/Contracts/ApplicationContract'

@Injectable()
export class TokenService extends GuardBaseService<ApplicationContract> {
  @Inject(TokenRepository)
  private tokenRepository: TokenRepository

  async list(pagination?: PaginationContract, data?: ApiRequestContract) {
    await this.initRequest(data)

    return this.tokenRepository.getAll(pagination, data)
  }

  async create(dto: CreateTokenDto) {
    dto.value = await random(64)
    dto.token = new Token().changePrefix('tkn', dto.token)

    return this.tokenRepository.storeOne(dto)
  }

  async show(id: string, data?: ApiRequestContract) {
    await this.initRequest(data)

    const token = await this.tokenRepository.getOne(id, data)

    if (!token) {
      throw new NotFoundException('NOT_FOUND_TOKEN')
    }

    return token
  }

  async delete(id: string) {
    const token = await this.show(id, {})

    return this.tokenRepository.deleteOne(token)
  }
}
