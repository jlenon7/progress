import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import User from '@Modules/Users/Infra/Typeorm/Entities/User'

interface IRequest {
  user_id: string
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    })

    return users
  }
}

export default ListProvidersService
