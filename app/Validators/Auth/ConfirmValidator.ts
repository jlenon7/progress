import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ConfirmValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string({}, [rules.exists({ table: 'users', column: 'id' })]),
    token: schema.string({}, [rules.exists({ table: 'user_tokens', column: 'token' })]),
  })

  public messages = {
    'user_id.string': 'User ID should be a valid string',
    'token.string': 'Token should be a valid string',
    'user_id.string.exists': 'User ID does not exists in Database',
    'token.string.exists': 'Token does not exists in Database',
  }
}
