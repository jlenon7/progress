import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ResetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string({}, [rules.confirmed()]),
    token: schema.string({}, [rules.exists({ table: 'application_tokens', column: 'token' })]),
  })

  public messages = {
    'password.string': 'Password should be a valid string',
    'password.string.confirmed': 'Password confirmation should be the same as password',
    'token.string': 'Token should be a valid string',
    'token.string.exists': 'Token does not exists in database',
  }
}
