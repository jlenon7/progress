import { BaseService } from './BaseService'
import { UserRepository } from 'App/Repositories/UserRepository'

import NotFoundException from 'App/Exceptions/NotFoundException'

export class UserService extends BaseService {
  public async getAll(includes?: string) {
    return new UserRepository().getAll(includes)
  }

  public async getOne(id: string, includes?: string) {
    const user = await new UserRepository().getOne(id, includes)

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
