import { JwtService } from '@nestjs/jwt'
import { ModuleRef } from '@nestjs/core'
import HashService from './hash.service'
import AuthUserDto from '../resolvers/dto/auth.user.dto'
import UserRepository from '../repositories/user.repository'
import AuthResponse from '../resolvers/responses/auth.response'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import TokenTypeEnum from '../../../database/ENUM/token-type.enum'
import UserTokenRepository from '../repositories/user.token.repository'

@Injectable()
export default class AuthUserService {
  constructor(
    private moduleRef: ModuleRef,
    private jwtService: JwtService,
    private hashService: HashService,
    private userRepository: UserRepository,
    private userTokenRepository: UserTokenRepository,
  ) {}

  public async execute(dto: AuthUserDto): Promise<AuthResponse> {
    const user = await this.userRepository.getUserByEmail(dto.email)

    const passwordMatched = await this.hashService.compareHash(
      dto.password,
      user.password,
    )

    if (!passwordMatched) {
      throw new UnauthorizedException(
        'USER_NOT_FOUND_CREDENTIALS',
        'Cant find any user with this credentials',
      )
    }

    const jwtPayload = {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      status: user.status,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }

    const accessExp = '10800'
    const accessToken = await this.jwtService.sign(jwtPayload, {
      expiresIn: accessExp,
    })

    await this.userTokenRepository.createUserToken({
      token: accessToken,
      type: TokenTypeEnum.ACCESS_TOKEN,
      expires_in: accessExp,
      is_revoked: false,
      user_id: user.id,
    })

    const refreshExp = '604800'
    const refreshToken = await this.jwtService.sign(jwtPayload, {
      expiresIn: refreshExp,
    })

    await this.userTokenRepository.createUserToken({
      token: refreshToken,
      type: TokenTypeEnum.REFRESH_TOKEN,
      expires_in: refreshExp,
      is_revoked: false,
      user_id: user.id,
    })

    return { user, token: accessToken }
  }
}
