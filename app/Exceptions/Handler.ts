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
    'E_UNAUTHORIZED',
  ]

  constructor() {
    super(Logger)
  }

  public async response(error, response: ResponseContract) {
    return response.status(error.status).json({
      status: error.status,
      method: response.request.method,
      code: error.code,
      path: response.request.url,
      timestamp: new Date().getTime(),
      error: {
        name: error.name,
        help: 'HttpExceptionHandler',
        message: error.message.split(': ')[1],
        messages: error.messages,
      },
    })
  }

  public async internalError(response: ResponseContract) {
    return response.status(500).json({
      code: 'E_INTERNAL_SERVER_ERROR',
      path: response.request.url,
      method: response.request.method,
      status: 500,
      timestamp: new Date().getTime(),
      error: {
        name: 'InternalServerError',
        message: 'Internal Server Error',
        help: 'This error is not accepted by the application, look the logs for full detail.',
      },
    })
  }

  public async handle(error, ctx: HttpContextContract) {
    if (Config.get('app.enviroment') !== 'production') {
      return this.response(error, ctx.response)
    }

    const statusCode = this.acceptedCodes.find((code) => code === error.code)

    if (statusCode) {
      return this.response(error, ctx.response)
    } else {
      return this.internalError(ctx.response)
    }
  }
}
