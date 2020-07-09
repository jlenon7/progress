// import User from '@Modules/Users/Infra/Typeorm/Entities/User'
import { injectable, inject } from 'tsyringe'

import AppError from '@Shared/Errors/AppError'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import IMailProvider from '@Shared/Container/Providers/MailProvider/Models/IMailProvider'
import IUserTokensRepository from '@Modules/Users/Repositories/IUserTokensRepository'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido: ${token}`,
    )
  }
}

export default SendForgotPasswordEmailService
