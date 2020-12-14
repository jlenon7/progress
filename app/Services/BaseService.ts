import User from 'App/Models/User'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import InternalServerException from 'App/Exceptions/InternalServerException'

import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { UserMailService } from './Auth/UserMailService'

export class BaseService {
  private _user: User | undefined

  private _guard: AuthContract

  public get User(): User {
    if (!this._guard) {
      throw new InternalServerException('GUARD_UNSETED')
    }

    this._user = this._guard.user

    if (!this._user) {
      throw new InternalServerException('USER_UNSETED')
    }

    if (this._user.status !== 'approved') {
      this.verifyStatus(this._user)
    }

    return this._user
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

  public verifyStatus(user: User) {
    if (user.status === 'pendent') {
      throw new UnauthorizedException(
        'Your profile is still pendent, please check your email inbox to approve it'
      )
    }

    if (user.status === 'reproved') {
      throw new UnauthorizedException('Your profile has been reproved from our application, sorry!')
    }

    if (user.status === 'deleted') {
      throw new UnauthorizedException(
        'Your profile has been deleted, contact suport to active it again'
      )
    }

    throw new UnauthorizedException()
  }
}
