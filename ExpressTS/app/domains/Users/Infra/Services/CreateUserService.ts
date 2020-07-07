import User from '@Domain/Users/Infra/Entities/User'
import { injectable, inject } from 'tsyringe'

import AppError from '@Exceptions/AppError'
import IUsersRepository from '@Domain/Users/Infra/Repositories/IUsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUsersExists = await this.usersRepository.findByEmail(email)

    if (checkUsersExists) {
      throw new AppError('Email address already used.')
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    })

    return user
  }
}

export default CreateUserService
