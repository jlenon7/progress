import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class AddressStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string(),
    icon: schema.string(),
    city: schema.string(),
    state: schema.string(),
    country: schema.string(),
    zipCode: schema.string(),
    street: schema.string(),
    number: schema.string(),
    district: schema.string(),
    complement: schema.string(),
  })

  public messages = {
    'title.required': 'Address title is required',
    'icon.required': 'Address icon is required',
    'city.required': 'Address city is required',
    'state.required': 'Address state is required',
    'country.required': 'Address country is required',
    'zipCode.required': 'Address zipCode is required',
    'street.required': 'Address street is required',
    'number.required': 'Address number is required',
    'district.required': 'Address district is required',
    'complement.required': 'Address complement is required',
  }
}
