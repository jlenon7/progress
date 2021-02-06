import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ForgotValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.email({ sanitize: true }),
      rules.exists({ table: 'applications', column: 'email' }),
    ]),
  })

  public messages = {
    'email.string': 'Email should be a valid string',
    'email.string.email': 'Email should be a valid email address',
    'email.string.exists': 'This email does not exists in our database',
  }
}
