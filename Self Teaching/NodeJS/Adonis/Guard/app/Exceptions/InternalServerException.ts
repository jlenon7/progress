import BaseException from './BaseException'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InternalServerException extends BaseException {
  constructor(
    message = 'An internal server error has ocurred, look for the logs to find what happened',
    status = 500,
    code = 'E_INTERNAL_SERVER'
  ) {
    super(message, status, code)
  }

  public async handle(error: this, { response }: HttpContextContract) {
    return this.response(error, response)
  }
}
