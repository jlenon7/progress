import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email({ sanitize: true })]),
    password: schema.string(),
  })

  public messages = {
    'email.string': 'Email should be a string',
    'email.string.email': 'Email should be a valid email',
    'password.string': 'Password should be a string',
  }
}
