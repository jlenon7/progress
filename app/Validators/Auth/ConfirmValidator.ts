import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ConfirmValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    token: schema.string({}, [rules.exists({ table: 'application_tokens', column: 'token' })]),
  })

  public messages = {
    'token.string': 'Token should be a valid string',
    'token.string.exists': 'Token does not exists in Database',
  }
}
