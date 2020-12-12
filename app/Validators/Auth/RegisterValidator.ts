import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string(),
  })

  public messages = {
    'name.string': 'Name should be a string',
    'email.string': 'Email should be a string',
    'email.string.email': 'Email should be a valid email',
    'email.string.unique': 'This email has already been taken',
    'password.string': 'Password should be a string',
  }
}
