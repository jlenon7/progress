import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { v4 } from 'uuid'
import { User } from '../Models/User'
import { HashService } from './HashService'
import { UpdateUserDto } from '../Dtos/UpdateUserDto'
import { CreateUserDto } from '../Dtos/CreateUserDto'
import { TokenTypeEnum } from '../Enums/TokenTypeEnum'
import { MailerService } from '@nestjs-modules/mailer'
import { UserStatusEnum } from '../Enums/UserStatusEnum'
import { UserRepository } from '../Repositories/UserRepository'
import { UserTokenRepository } from '../Repositories/UserTokenRepository'

@Injectable()
export class UserService {
  constructor(
    private hashService: HashService,
    private mailerService: MailerService,
    private userRepository: UserRepository,
    private userTokenRepository: UserTokenRepository,
  ) {}

  public async create(dto: CreateUserDto): Promise<User> {
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

  public async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.getUser(id)

    const verifyEmail = await this.userRepository.getUserByEmail(dto.email)

    if (verifyEmail && verifyEmail.id !== id) {
      throw new UnauthorizedException(
        'EMAIL_ALREADY_IN_USE',
        'This e-mail is already in use!',
      )
    }

    user.name = dto.name
    user.email = dto.email

    if (dto.password && dto.old_password) {
      const checkOldPassword = await this.hashService.compareHash(
        dto.old_password,
        user.password,
      )

      if (!checkOldPassword) {
        throw new BadRequestException(
          'PASSWORD_DONT_MATCH',
          'Password and old password does not have the same HASH!',
        )
      }

      user.password = await this.hashService.generateHash(dto.password)
    }

    return this.userRepository.storage(user)
  }

  public async delete(id: string): Promise<void> {
    const user = await this.userRepository.getUser(id)

    user.status = UserStatusEnum.DELETED
    user.deleted_at = new Date()

    await this.userRepository.storage(user)
  }
}
