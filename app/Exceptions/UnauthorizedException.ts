import BaseException from './BaseException'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UnauthorizedException extends BaseException {
  constructor(message = 'User unauthorized', status = 401, code = 'E_UNAUTHORIZED') {
    super(message, status, code)
  }

  public async handle(error: this, { response }: HttpContextContract) {
    return this.response(error, response)
  }
}
