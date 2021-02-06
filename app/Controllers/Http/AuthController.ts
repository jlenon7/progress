import { AuthService } from 'App/Services'
import { ApiController } from 'App/Controllers/ApiController'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  LoginValidator,
  ConfirmValidator,
  ForgotValidator,
  ResetValidator,
  RegisterValidator,
} from 'App/Validators/Auth'

export default class AuthController extends ApiController {
  public async me({ auth, response }: HttpContextContract) {
    const application = await new AuthService().setGuard(auth).me()

    return this.response(response).withOne(application)
  }

  public async register({ request, response }: HttpContextContract) {
    const data = await this.request(request).validate(RegisterValidator)

    const application = await new AuthService().register({
      name: data.name,
      email: data.email,
      password: data.password,
    })

    return this.response(response).withCreated(application)
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await this.request(request).validate(LoginValidator)

    const token = await new AuthService().setGuard(auth).login(email, password, request.ip())

    return this.response(response).withOne(token)
  }

  public async logout({ auth, response }: HttpContextContract) {
    await new AuthService().setGuard(auth).logout()

    return this.response(response).withMessage('Successfully logged out')
  }

  public async confirm({ request, response }: HttpContextContract) {
    const data = await this.request(request).validate(ConfirmValidator)

    await new AuthService().confirm(data)

    return this.response(response).withMessage('Account successfully confirmed')
  }

  public async forgot({ request, response }: HttpContextContract) {
    const data = await this.request(request).validate(ForgotValidator)

    await new AuthService().forgot(data)

    return this.response(response).withMessage('Email successfully sent')
  }

  public async reset({ request, response }: HttpContextContract) {
    const data = await this.request(request).validate(ResetValidator)

    await new AuthService().reset(data)

    return this.response(response).withMessage('Password reset successfully')
  }
}
