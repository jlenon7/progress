import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UnauthorizedException extends Exception {
  constructor(message = 'Application unauthorized', status = 401, code = 'E_UNAUTHORIZED') {
    super(message, status, code)
  }

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).send({
      status: error.status,
      method: ctx.response.request.method,
      code: error.code,
      path: ctx.response.request.url,
      timestamp: new Date().getTime(),
      error: {
        name: error.name,
        help: 'BaseException',
        message: error.message.split(': ')[1],
      },
    })
  }
}
