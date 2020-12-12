import { UserService } from 'App/Services'
import { ApiController } from 'App/Controllers/ApiController'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserController extends ApiController {
  public async index({ request, response, auth }: HttpContextContract) {
    const data = request.only(['where', 'orderBy', 'includes'])

    const users = await new UserService().setGuard(auth).getAll(data)

    return this.response(response).withCollection(users)
  }

  public async show({ request, response, params, auth }: HttpContextContract) {
    const data = request.only(['where', 'orderBy', 'includes'])

    const user = await new UserService().setGuard(auth).getOne(params.id, data)

    return this.response(response).withOne(user)
  }

  public async delete({ response, params, auth }: HttpContextContract) {
    const user = await new UserService().setGuard(auth).delete(params.id)

    return this.response(response).withOne(user)
  }
}
