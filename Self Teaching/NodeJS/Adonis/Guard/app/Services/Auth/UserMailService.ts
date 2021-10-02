import Mail from '@ioc:Adonis/Addons/Mail'
import Config from '@ioc:Adonis/Core/Config'

import { User } from 'App/Models'
import { Token } from '@secjs/core'
import { DateTime } from 'luxon'

export class UserMailService {
  public async newLogin(user: User, token: any, ip: string): Promise<void> {
    const url = `${Config.get('app.url')}/auth/account-invasion/${token}`

    Mail.send((message) => {
      message
        .to(user.email)
        .subject('New login into your account!')
        .htmlView('email/new_login', { user, url, ip })
    })
  }

  public async confirmToken(user: User, newToken = false): Promise<void> {
    let userToken = await user
      .related('userTokens')
      .query()
      .where('type', 'confirmation_token')
      .first()

    if (newToken) {
      await user
        .related('userTokens')
        .query()
        .where('type', 'confirmation_token')
        .update({ status: 'expired' })

      userToken = await user.related('userTokens').create({
        name: 'Confirmation Token',
        type: 'confirmation_token',
        token: new Token().generate('utk'),
      })
    }

    const url = `${Config.get('app.url')}/auth/confirm/${userToken?.token}`

    Mail.send((message) => {
      message.to(user.email).subject('Welcome Onboard!').htmlView('email/welcome', { user, url })
    })
  }

  public async forgotPassword(user: User): Promise<void> {
    const today = new Date()
    const tommorow = new Date(today.setDate(today.getDate() + 1))

    const userToken = await user.related('userTokens').create({
      name: 'Forgot Token',
      type: 'forgot_token',
      token: new Token().generate('utk'),
      expiresAt: DateTime.fromJSDate(tommorow),
    })

    const url = `${Config.get('app.url')}/auth/forgot/${userToken.token}`

    Mail.send((message) => {
      message
        .to(user.email)
        .subject('Forgot password request')
        .htmlView('email/forgot', { user, url })
    })
  }
}
