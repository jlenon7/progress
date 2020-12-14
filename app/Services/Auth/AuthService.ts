import NotFoundException from 'App/Exceptions/NotFoundException'

import { BaseService } from 'App/Services'
import { UserMailService } from './UserMailService'
import { UserRepository } from 'App/Repositories/UserRepository'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import { UserToken } from 'App/Models/UserToken'

export class AuthService extends BaseService {
  public async me() {
    if (!this.User) {
      throw new NotFoundException()
    }

    await this.User.preload('roles')

    return this.User
  }

  public async register(data: any) {
    const user = await new UserRepository().create(data)

    await new UserMailService().confirmToken(user)

    return user
  }

  public async login(email: string, password: string, ip: string) {
    const token = await this.guard.attempt(email, password, {
      expiresIn: '1 days',
    })

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

  public async confirm({ token }) {
    const userToken = await UserToken.findByOrFail('token', token)

    if (userToken.status !== 'created') {
      throw new UnauthorizedException('This token has been already used!')
    }

    await userToken.preload('user')

    const user = userToken.user

    if (user.status === 'approved') {
      throw new UnauthorizedException('User is already approved!')
    }

    if (userToken.createdAt > userToken.expiresAt) {
      await user.related('userTokens').query().where('token', token).update({ status: 'expired' })

      await new UserMailService().confirmToken(user, true)

      throw new UnauthorizedException(
        'Sorry, this token has expired, check your email inbox to get a new one'
      )
    }

    await user.related('userTokens').query().where('token', token).update({ status: 'used' })
    await new UserRepository().update(user.id, { status: 'approved' })
  }

  public async forgot({ email }) {
    const user = await new UserRepository().getOne(null, {
      where: [{ key: 'email', value: email }],
    })

    new UserMailService().forgotPassword(user)
  }

  public async reset({ password, token }) {
    const userToken = await UserToken.findByOrFail('token', token)

    if (userToken.status !== 'created') {
      throw new UnauthorizedException('This token has been already used!')
    }

    await userToken.preload('user')

    const user = userToken.user

    userToken.status = 'used'
    await userToken.save()

    user.password = password
    await user.save()
  }
}
