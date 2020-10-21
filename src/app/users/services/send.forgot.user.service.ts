import { v4 } from 'uuid'
import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import UserRepository from '../repositories/user.repository'
import TokenTypeEnum from '../../../database/ENUM/token-type.enum'
import UserTokenRepository from '../repositories/user.token.repository'

@Injectable()
export default class SendForgotUserService {
  constructor(
    private mailerService: MailerService,
    private userRepository: UserRepository,
    private userTokenRepository: UserTokenRepository,
  ) {}

  public async execute(email: string): Promise<void> {
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
}
