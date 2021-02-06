import NotFoundException from 'App/Exceptions/NotFoundException'

import { BaseService } from 'App/Services'
import { ApplicationMailService } from './ApplicationMailService'
import { ApplicationRepository } from 'App/Repositories/ApplicationRepository'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import { ApplicationToken } from 'App/Models/ApplicationToken'

export class AuthService extends BaseService {
  public async me() {
    if (!this.Application) {
      throw new NotFoundException()
    }

    await this.Application.preload('roles')

    return this.Application
  }

  public async register(data: any) {
    const application = await new ApplicationRepository().create(data)

    await new ApplicationMailService().confirmToken(application)

    return application
  }

  public async login(email: string, password: string, ip: string) {
    const token = await this.guard.attempt(email, password, {
      expiresIn: '1 days',
    })

    await this.Application.related('applicationTokens')
      .query()
      .where({
        type: 'api_token',
        status: 'in_use',
      })
      .update({ status: 'used' })

    await this.Application.related('applicationTokens').create({
      ip,
      name: 'API Token',
      type: 'api_token',
      token: token.toJSON().token,
      status: 'in_use',
    })

    new ApplicationMailService().newLogin(this.Application, token, ip)

    return token.toJSON()
  }

  public async logout() {
    return this.guard.logout()
  }

  public async confirm({ token }) {
    const applicationToken = await ApplicationToken.findByOrFail('token', token)

    if (applicationToken.status !== 'created') {
      throw new UnauthorizedException('This token has been already used!')
    }

    await applicationToken.preload('application')

    const application = applicationToken.application

    if (application.status === 'approved') {
      throw new UnauthorizedException('Application is already approved!')
    }

    if (applicationToken.createdAt > applicationToken.expiresAt) {
      await application
        .related('applicationTokens')
        .query()
        .where('token', token)
        .update({ status: 'expired' })

      await new ApplicationMailService().confirmToken(application, true)

      throw new UnauthorizedException(
        'Sorry, this token has expired, check your email inbox to get a new one'
      )
    }

    await application
      .related('applicationTokens')
      .query()
      .where('token', token)
      .update({ status: 'used' })
    await new ApplicationRepository().update(application.id, { status: 'pendent_issue' })
  }

  public async forgot({ email }) {
    const application = await new ApplicationRepository().getOne(null, {
      where: [{ key: 'email', value: email }],
    })

    new ApplicationMailService().forgotPassword(application)
  }

  public async reset({ password, token }) {
    const applicationToken = await ApplicationToken.findByOrFail('token', token)

    if (applicationToken.status !== 'created') {
      throw new UnauthorizedException('This token has been already used!')
    }

    await applicationToken.preload('application')

    const application = applicationToken.application

    applicationToken.status = 'used'
    await applicationToken.save()

    application.password = password
    await application.save()
  }
}
