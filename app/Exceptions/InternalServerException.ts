import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InternalServerException extends Exception {
  constructor(
    message = 'An internal server error has ocurred, look for the logs to find what happened',
    status = 500,
    code = 'E_INTERNAL_SERVER'
  ) {
    super(message, status, code)
  }

  public async handle(error, ctx: HttpContextContract) {
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
