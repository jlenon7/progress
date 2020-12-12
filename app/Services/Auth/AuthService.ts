import NotFoundException from 'App/Exceptions/NotFoundException'

import { BaseService } from 'App/Services'
import { UserMailService } from './UserMailService'
import { UserRepository } from 'App/Repositories/UserRepository'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'

export class AuthService extends BaseService {
  public async me() {
    if (!this.User) {
      throw new NotFoundException()
    }

    return this.User
  }

  public async register(data: any) {
    const user = await new UserRepository().create(data)

    await new UserMailService().confirmToken(user)

    return user
  }

  public async login(email: string, password: string, ip: string) {
    const token = await this.guard.attempt(email, password)

    await this.User.related('userTokens')
      .query()
      .where({
        type: 'api_token',
        status: 'in_use',
      })
      .update({ status: 'used' })

    await this.User.related('userTokens').create({
      ip,
      name: 'API Token',
      type: 'api_token',
      token: token.toJSON().token,
      status: 'in_use',
    })

    new UserMailService().newLogin(this.User, token, ip)

    return token.toJSON()
  }

  public async logout() {
    return this.guard.logout()
  }

  public async confirm({ user_id, token }) {
    const user = await new UserRepository().getOne(user_id)

    if (user.status === 'approved') {
      throw new UnauthorizedException('User is already approved!')
    }

    const userToken = await user.related('userTokens').query().where('token', token)

    if (userToken.created_at > userToken.expiresAt) {
      await user.related('userTokens').query().where('token', token).update({ status: 'expired' })

      // TODO Criar método no UserMailService para enviar confirmToken pelo ID do Usuário e chamar aqui

      throw new UnauthorizedException('Sorry, your token has expired!')
    }

    await user.related('userTokens').query().where('token', token).update({ status: 'used' })
    await new UserRepository().update(user.id, { status: 'approved' })
  }
}
