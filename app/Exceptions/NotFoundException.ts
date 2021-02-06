import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotFoundException extends Exception {
  constructor(
    message = 'Unable to find the data you are looking for',
    status = 404,
    code = 'E_NOT_FOUND'
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
