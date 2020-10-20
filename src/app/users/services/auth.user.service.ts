import { JwtService } from '@nestjs/jwt'
import { ModuleRef } from '@nestjs/core'
import HashService from '../../services/hash.service'
import AuthUserDto from '../resolvers/dto/auth.user.dto'
import UserRepository from '../repositories/user.repository'
import AuthResponse from '../resolvers/responses/auth.response'
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export default class AuthUserService {
  private hashService: HashService

  constructor(
    private moduleRef: ModuleRef,
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {
    this.hashService = this.moduleRef.get(HashService, { strict: false })
  }

  public async execute(dto: AuthUserDto): Promise<AuthResponse> {
    const user = await this.userRepository.getUserByEmail(dto.email)

    if (!user) {
      throw new NotFoundException(
        'USER_NOT_FOUND',
        'Cant find any user with this credentials',
      )
    }

    const passwordMatched = await this.hashService.compareHash(
      dto.password,
      user.password,
    )

    if (!passwordMatched) {
      throw new UnauthorizedException(
        'USER_NOT_FOUND',
        'Cant find any user with this credentials',
      )
    }

    const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }
    const token = await this.jwtService.sign(jwtPayload)

    return { user, token }
  }
}
