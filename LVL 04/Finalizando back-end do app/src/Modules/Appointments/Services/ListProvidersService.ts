import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import ICacheProvider from '@Shared/Container/Providers/CacheProvider/Models/ICacheProvider'

import User from '@Modules/Users/Infra/Typeorm/Entities/User'

interface IRequest {
  user_id: string
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    )

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      })
    }

    await this.cacheProvider.save(`providers-list:${user_id}`, users)

    return users
  }
}

export default ListProvidersService
