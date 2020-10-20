import { v4 } from 'uuid'
import User from '../models/user.entity'
import { ModuleRef } from '@nestjs/core'
import HashService from '../../services/hash.service'
import { MailerService } from '@nestjs-modules/mailer'
import CreateUserDto from '../resolvers/dto/create.user.dto'
import UserRepository from '../repositories/user.repository'
import TokenTypeEnum from '../../../database/ENUM/token-type.enum'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import UserTokenRepository from '../repositories/user.token.repository'

@Injectable()
export default class CreateUserService {
  private hashService: HashService
  constructor(
    private moduleRef: ModuleRef,
    private mailerService: MailerService,
    private userRepository: UserRepository,
    private userTokenRepository: UserTokenRepository,
  ) {
    this.hashService = this.moduleRef.get(HashService, { strict: false })
  }

  public async execute(dto: CreateUserDto): Promise<User> {
    const verifyDuplicatedEmail = await this.userRepository.getUserByEmail(
      dto.email,
    )

    if (verifyDuplicatedEmail) {
      throw new UnauthorizedException(
        'EMAIL_ALREADY_IN_USE',
        'This e-mail is already in use!',
      )
    }

    const hashedPassword = await this.hashService.generateHash(dto.password)

    const userCreated = await this.userRepository.createUser({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    })

    const userToken = await this.userTokenRepository.createUserToken({
      token: `(${userCreated.name}/${userCreated.email})-[${v4()}]`,
      type: TokenTypeEnum.EMAIL_CONFIRMATION,
      expires_in: '604800',
      user_id: userCreated.id,
      is_revoked: false,
    })

    const mail = {
      to: userCreated.email,
      from: 'noreply@application.com',
      subject: 'Email de confirmação',
      template: 'email-confirmation',
      context: {
        token: userToken.token,
      },
    }

    await this.mailerService.sendMail(mail)

    return userCreated
  }
}
