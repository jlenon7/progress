import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.unique({ table: 'applications', column: 'name' })]),
    email: schema.string({}, [
      rules.email({ sanitize: true }),
      rules.unique({ table: 'applications', column: 'email' }),
    ]),
    password: schema.string(),
  })

  public messages = {
    'name.string': 'Name should be a string',
    'name.unique': 'This application name has already been taken',
    'email.string': 'Email should be a string',
    'email.email': 'Email should be a valid email',
    'email.unique': 'This email has already been taken',
    'password.string': 'Password should be a string',
  }
}
