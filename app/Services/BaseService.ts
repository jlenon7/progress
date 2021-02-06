import { Application } from 'App/Models'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import InternalServerException from 'App/Exceptions/InternalServerException'

import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export class BaseService {
  private _application: Application | undefined

  private _guard: AuthContract

  public get Application(): Application {
    if (!this._guard) {
      throw new InternalServerException('GUARD_UNSETED')
    }

    this._application = this._guard.user

    if (!this._application) {
      throw new InternalServerException('APPLICATION_UNSETED')
    }

    if (this._application.status === 'pendent_issue') {
      return this._application
    }

    if (this._application.status !== 'approved') {
      this.verifyStatus(this._application)
    }

    return this._application
  }

  public get application(): Application {
    if (!this._guard) {
      throw new InternalServerException('GUARD_UNSETED')
    }

    this._application = this._guard.user

    if (!this._application) {
      throw new InternalServerException('APPLICATION_UNSETED')
    }

    if (this._application.status !== 'approved') {
      this.verifyStatus(this._application)
    }

    return this._application
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

  public verifyStatus(application: Application) {
    if (application.status === 'pendent_issue') {
      throw new UnauthorizedException(
        'Your profile is still pendent by some issue, please finalize your registration to proceed'
      )
    }

    if (application.status === 'pendent') {
      throw new UnauthorizedException(
        'Your profile is still pendent, please check your email inbox to approve it'
      )
    }

    if (application.status === 'reproved') {
      throw new UnauthorizedException('Your profile has been reproved from our application, sorry!')
    }

    if (application.status === 'deleted') {
      throw new UnauthorizedException(
        'Your profile has been deleted, contact suport to active it again'
      )
    }

    throw new UnauthorizedException()
  }
}
