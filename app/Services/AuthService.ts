import { BaseService } from './BaseService'
import { UserRepository } from 'App/Repositories/UserRepository'
import NotFoundException from 'App/Exceptions/NotFoundException'

export class AuthService extends BaseService {
  public async me() {
    if (!this.User) {
      throw new NotFoundException()
    }

    return this.User
  }

  public async register(data: any) {
    return new UserRepository().create(data)
  }

  public async login(email: string, password: string) {
    const token = await this.guard.attempt(email, password)

    return token.toJSON()
  }

  public async logout() {
    return this.guard.logout()
  }
}
