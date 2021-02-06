import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({}, [
      rules.unique({
        table: 'applications',
        column: 'name',
        whereNot: { id: this.ctx.params.id },
      }),
    ]),
    email: schema.string.optional({}, [
      rules.email({ sanitize: true }),
      rules.unique({
        table: 'applications',
        column: 'email',
        whereNot: { id: this.ctx.params.id },
      }),
    ]),
    password: schema.string.optional({}, [rules.confirmed()]),
  })

  public messages = {
    'name.string': 'Name should be a string',
    'name.unique': 'Application name already exists on our database',
    'email.string': 'Email should be a string',
    'email.email': 'Email should be a valid email',
    'email.unique': 'Email already exists in our database',
    'password.string': 'Password should be a valid string',
    'password.confirmed': 'Password confirmation should be the same as password',
  }
}
