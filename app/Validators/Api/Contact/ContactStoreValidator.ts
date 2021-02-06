import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ContactStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string(),
    icon: schema.string(),
    type: schema.enum([
      'email',
      'phone',
      'cellphone',
      'facebook',
      'instagram',
      'linkedin',
      'site',
      'github',
    ]),
    contact: schema.string(),
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
