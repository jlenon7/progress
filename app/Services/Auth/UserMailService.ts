import Mail from '@ioc:Adonis/Addons/Mail'
import Config from '@ioc:Adonis/Core/Config'

import { User } from 'App/Models'
import { Token } from '@secjs/core'

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

    const url = `${Config.get('app.url')}/auth/confirm/${user.id}/${userToken?.token}`

    Mail.send((message) => {
      message.to(user.email).subject('Welcome Onboard!').htmlView('email/welcome', { user, url })
    })
  }
}
