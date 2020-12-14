import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'

export default class Is {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>, args: string[]) {
    const user = auth.user

    if (!user) {
      throw new UnauthorizedException('User not found in context')
    }

    const role = await user.related('roles').query().whereIn('slug', args).first()

    if (!role) {
      throw new UnauthorizedException('User with insufficient permissions')
    }

    await next()
  }
}
