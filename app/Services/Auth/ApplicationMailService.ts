import Mail from '@ioc:Adonis/Addons/Mail'
import Config from '@ioc:Adonis/Core/Config'

import { Application } from 'App/Models'
import { Token } from '@secjs/core'
import { DateTime } from 'luxon'

export class ApplicationMailService {
  public async newLogin(application: Application, token: any, ip: string): Promise<void> {
    const url = `${Config.get('app.url')}/auth/account-invasion/${token}`

    Mail.send((message) => {
      message
        .to(application.email)
        .subject('New login into your account!')
        .htmlView('email/new_login', { application, url, ip })
    })
  }

  public async confirmToken(application: Application, newToken = false): Promise<void> {
    let applicationToken = await application
      .related('applicationTokens')
      .query()
      .where('type', 'confirmation_token')
      .first()

    if (newToken) {
      await application
        .related('applicationTokens')
        .query()
        .where('type', 'confirmation_token')
        .update({ status: 'expired' })

      applicationToken = await application.related('applicationTokens').create({
        name: 'Confirmation Token',
        type: 'confirmation_token',
        token: new Token().generate('utk'),
      })
    }

    const url = `${Config.get('app.url')}/auth/confirm/${applicationToken?.token}`

    Mail.send((message) => {
      message
        .to(application.email)
        .subject('Welcome Onboard!')
        .htmlView('email/welcome', { application, url })
    })
  }

  public async forgotPassword(application: Application): Promise<void> {
    const today = new Date()
    const tommorow = new Date(today.setDate(today.getDate() + 1))

    const applicationToken = await application.related('applicationTokens').create({
      name: 'Forgot Token',
      type: 'forgot_token',
      token: new Token().generate('utk'),
      expiresAt: DateTime.fromJSDate(tommorow),
    })

    const url = `${Config.get('app.url')}/auth/forgot/${applicationToken.token}`

    Mail.send((message) => {
      message
        .to(application.email)
        .subject('Forgot password request')
        .htmlView('email/forgot', { application, url })
    })
  }
}
