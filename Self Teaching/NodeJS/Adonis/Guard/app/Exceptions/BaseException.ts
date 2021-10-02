import { Exception } from '@poppinss/utils'
import { ResponseContract } from '@ioc:Adonis/Core/Response'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new BaseException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class BaseException extends Exception {
  constructor(message: string, status: number, code: string) {
    super(message, status, code)
  }

  public async response(error: this, response: ResponseContract) {
    return response.status(error.status).json({
      code: error.code,
      status: error.status,
      timestamp: new Date().getTime(),
      error: {
        name: error.name,
        help: error.help,
        message: error.message,
        stack: error.stack,
      },
    })
  }
}
