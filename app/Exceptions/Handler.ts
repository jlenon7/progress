/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import { Exception } from '@poppinss/utils'
import Config from '@ioc:Adonis/Core/Config'
import Logger from '@ioc:Adonis/Core/Logger'
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected acceptedCodes: string[] = [
    'E_INVALID_AUTH_UID',
    'E_VALIDATION_FAILURE',
    'E_UNAUTHORIZED_ACCESS',
    'E_INVALID_AUTH_PASSWORD',
    'E_NOT_FOUND',
  ]

  constructor() {
    super(Logger)
  }

  public async response(error, response: ResponseContract) {
    response.status(error.status).json({
      code: error.code,
      status: error.status,
      timestamp: new Date().getTime(),
      error: {
        name: error.name,
        help: error.help,
        message: error.message,
        messages: error.messages,
      },
    })
  }

  public async internalError(response: ResponseContract) {
    response.status(500).json({
      code: 'InternalServerError',
      status: 500,
      timestamp: new Date().getTime(),
      error: {
        name: 'InternalServerError',
        message: 'E_INTERNAL_SERVER',
        help: 'This error is not accepted by the application, look the logs for full detail.',
      },
    })
  }

  public async handle(error: Exception, ctx: HttpContextContract) {
    if (Config.get('app.enviroment') !== 'production') return this.response(error, ctx.response)

    const statusCode = this.acceptedCodes.find((code) => code === error.code)

    if (statusCode) return this.response(error, ctx.response)
    else return this.internalError(ctx.response)
  }
}
