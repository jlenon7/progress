import { BaseService } from 'App/Services'
import { UserRepository } from 'App/Repositories/UserRepository'
import { ApiRequestContract } from 'App/Contracts/ApiRequestContract'

import NotFoundException from 'App/Exceptions/NotFoundException'

export class UserService extends BaseService {
  public async getAll(pagination, data?: ApiRequestContract) {
    return new UserRepository().getAll(pagination, data)
  }

  public async getOne(id: string, data?: ApiRequestContract) {
    const user = await new UserRepository().getOne(id, data)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  public async delete(id: string) {
    const user = await new UserRepository().delete(id)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }
}
