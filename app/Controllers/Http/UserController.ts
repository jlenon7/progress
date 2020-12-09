import { ApiController } from 'App/Controllers/ApiController'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserService } from 'App/Services'

export default class UserController {
  public async index({ response, auth }: HttpContextContract) {
    const users = await new UserService().setGuard(auth).getAll()

    return new ApiController({ response }).resWithCollection(users)
  }

  public async show({ response, params, auth }: HttpContextContract) {
    const user = await new UserService().setGuard(auth).getOne(params.id)

    return new ApiController({ response }).resWithOne(user)
  }

  public async delete({ response, params, auth }: HttpContextContract) {
    const user = await new UserService().setGuard(auth).delete(params.id)

    return new ApiController({ response }).resWithOne(user)
  }
}
