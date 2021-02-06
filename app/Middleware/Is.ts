import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'

export default class Is {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>, args: string[]) {
    const application = auth.user

    if (!application) {
      throw new UnauthorizedException('Application not found in context')
    }

    const role = await application.related('roles').query().whereIn('slug', args).first()

    if (!role) {
      throw new UnauthorizedException('Application with insufficient permissions')
    }

    await next()
  }
}
