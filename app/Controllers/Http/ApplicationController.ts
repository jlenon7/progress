import { ApplicationService } from 'App/Services'
import { ApiController } from 'App/Controllers/ApiController'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator } from 'App/Validators/Auth'
import { ApplicationRepository } from 'App/Repositories/ApplicationRepository'

export default class ApplicationController extends ApiController {
  public async token({ response, params }: HttpContextContract) {
    const token = params.token

    const application = await new ApplicationRepository().getOne(null, {
      where: [
        { key: 'token', value: token },
        { key: 'status', value: 'approved' },
      ],
    })

    return this.response(response).withOne(application)
  }

  public async index({ request, response, auth, pagination }: HttpContextContract) {
    const data = request.only(['where', 'orderBy', 'includes'])

    const applications = await new ApplicationService().setGuard(auth).getAll(pagination, data)

    return this.response(response).withCollection(applications.toJSON())
  }

  public async show({ request, response, params, auth }: HttpContextContract) {
    const data = request.only(['where', 'orderBy', 'includes'])

    const application = await new ApplicationService().setGuard(auth).getOne(params.id, data)

    return this.response(response).withOne(application)
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    const data = await this.request(request).validate(UpdateValidator)

    const application = await new ApplicationService().setGuard(auth).update(params.id, data)

    return this.response(response).withOne(application)
  }

  public async delete({ response, params, auth }: HttpContextContract) {
    const application = await new ApplicationService().setGuard(auth).delete(params.id)

    return this.response(response).withSoftDeleted(application.name)
  }
}
