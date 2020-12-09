import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import InternalServerException from 'App/Exceptions/InternalServerException'
import User from 'App/Models/User'

export class BaseService {
  protected user: User | undefined
  protected _guard: AuthContract

  public get User(): User {
    if (!this._guard) {
      throw new InternalServerException('GUARD_UNSETED', 500)
    }

    this.user = this._guard.user

    if (!this.user) {
      throw new InternalServerException('USER_UNSETED', 500)
    }

    return this.user
  }

  public get guard(): AuthContract {
    if (!this._guard) {
      throw new InternalServerException('GUARD_UNSETED', 500)
    }

    return this._guard
  }

  public setGuard(guard: AuthContract) {
    this._guard = guard

    return this
  }
}
