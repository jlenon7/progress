import BaseException from './BaseException'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotFoundException extends BaseException {
  constructor(
    message = 'Unable to find the data you are looking for',
    status = 404,
    code = 'E_NOT_FOUND'
  ) {
    super(message, status, code)
  }

  public async handle(error: this, { response }: HttpContextContract) {
    return this.response(error, response)
  }
}
