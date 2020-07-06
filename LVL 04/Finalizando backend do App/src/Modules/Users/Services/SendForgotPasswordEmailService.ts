// import User from '@Modules/Users/Infra/Typeorm/Entities/User'
import { injectable, inject } from 'tsyringe'

import AppError from '@Shared/Errors/AppError'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import IMailProvider from '@Shared/Container/Providers/MailProvider/Models/IMailProvider'

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
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (!checkUserExists) {
      throw new AppError('User does not exists.')
    }

    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido')
  }
}

export default SendForgotPasswordEmailService
