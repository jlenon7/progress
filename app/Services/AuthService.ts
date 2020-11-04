import { v4 } from 'uuid'
import { User } from '../Models/User'
import { JwtService } from '@nestjs/jwt'
import { HashService } from './HashService'
import { AuthUserDto } from '../Dtos/AuthUserDto'
import { MailerService } from '@nestjs-modules/mailer'
import { TokenTypeEnum } from '../Enums/TokenTypeEnum'
import { UserStatusEnum } from '../Enums/UserStatusEnum'
import { AuthResponseDto } from '../Dtos/AuthResponseDto'
import { TokenStatusEnum } from '../Enums/TokenStatusEnum'
import { UserRepository } from '../Repositories/UserRepository'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserTokenRepository } from '../Repositories/UserTokenRepository'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private hashService: HashService,
    private configService: ConfigService,
    private mailerService: MailerService,
    private userRepository: UserRepository,
    private userTokenRepository: UserTokenRepository,
  ) {}

  public async auth(dto: AuthUserDto): Promise<AuthResponseDto> {
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

    const accessExp = 10800
    const accessToken = await this.jwtService.sign(jwtPayload, {
      expiresIn: accessExp,
    })

    await this.userTokenRepository.createOrUpdateUserToken({
      token: accessToken,
      type: TokenTypeEnum.ACCESS_TOKEN,
      expires_in: accessExp.toString(),
      is_revoked: false,
      user_id: user.id,
    })

    const refreshExp = 604800
    const refreshToken = await this.jwtService.sign(jwtPayload, {
      expiresIn: refreshExp,
    })

    await this.userTokenRepository.createOrUpdateUserToken({
      token: refreshToken,
      type: TokenTypeEnum.REFRESH_TOKEN,
      expires_in: refreshExp.toString(),
      is_revoked: false,
      user_id: user.id,
    })

    return { user, token: accessToken }
  }

  public async confirm(token: string): Promise<User> {
    const userToken = await this.userTokenRepository.getUserToken(token)

    const user = await this.userRepository.getUser(userToken.user_id)
    user.status = UserStatusEnum.APPROVED

    userToken.is_revoked = true
    userToken.revoked_at = new Date()
    userToken.status = TokenStatusEnum.REVOKED

    await this.userTokenRepository.storage(userToken)

    return this.userRepository.storage(user)
  }

  public async forgot(email: string): Promise<void> {
    const user = await this.userRepository.getUserByEmail(email)

    const userToken = await this.userTokenRepository.createUserToken({
      token: `(${user.name}/${user.email})-[${v4()}]`,
      type: TokenTypeEnum.FORGOT_PASSWORD,
      expires_in: '604800',
      user_id: user.id,
      is_revoked: false,
    })

    const mail = {
      to: user.email,
      from: 'noreply@application.com',
      subject: 'Recuperação de senha',
      template: 'recover-password',
      context: {
        token: userToken.token,
      },
    }

    await this.mailerService.sendMail(mail)
  }

  public async reset(token: string, password: string): Promise<User> {
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
