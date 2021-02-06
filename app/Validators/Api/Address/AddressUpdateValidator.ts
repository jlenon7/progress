import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class AddressUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional(),
    icon: schema.string.optional(),
    city: schema.string.optional(),
    state: schema.string.optional(),
    country: schema.string.optional(),
    zipCode: schema.string.optional(),
    street: schema.string.optional(),
    number: schema.string.optional(),
    district: schema.string.optional(),
    complement: schema.string.optional(),
  })

  public messages = {}
}
