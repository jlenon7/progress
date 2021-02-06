import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ContactUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional(),
    icon: schema.string.optional(),
    type: schema.enum.optional([
      'email',
      'phone',
      'cellphone',
      'facebook',
      'instagram',
      'linkedin',
      'site',
      'github',
    ]),
    contact: schema.string.optional(),
  })

  public messages = {
    'title.required': 'Contact title is required',
    'icon.required': 'Contact icon is required',
    'type.required': 'Contact type is required',
    'type.enum':
      'Contact type should be email, phone, cellphone, facebook, instagram, linkedin, site or github',
    'contact.required': 'Contact is required',
  }
}
