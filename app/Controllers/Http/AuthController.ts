import { AuthService } from 'App/Services'
import { ApiController } from 'App/Controllers/ApiController'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { LoginValidator, RegisterValidator } from 'App/Validators'

export default class AuthController {
  public async me({ auth, response }: HttpContextContract) {
    const user = await new AuthService().setGuard(auth).me()

    return new ApiController({ response }).resWithOne(user)
  }

  public async register({ request, response }: HttpContextContract) {
    const data = await new ApiController({ request }).validate(RegisterValidator)

    const user = await new AuthService().register({
      name: data.name,
      email: data.email,
      password: data.password,
    })

    return new ApiController({ response }).resWithCreated(user)
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await new ApiController({ request }).validate(LoginValidator)

    const token = await new AuthService().setGuard(auth).login(email, password)

    return new ApiController({ response }).resWithOne(token)
  }

  public async logout({ auth, response }: HttpContextContract) {
    await new AuthService().setGuard(auth).logout()

    return new ApiController({ response }).resWithNone()
  }
}
