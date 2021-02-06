import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class AttachmentUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional(),
    icon: schema.string.optional(),
    type: schema.enum.optional(['avatar', 'rg', 'cnh', 'id', 'proof_of_address', 'mock']),
    pathFront: schema.file.optional({
      size: '5mb',
      extnames: ['png', 'jpg', 'jpeg', 'pdf'],
    }),
    pathBack: schema.file.optional({
      size: '5mb',
      extnames: ['png', 'jpg', 'jpeg', 'pdf'],
    }),
    document: schema.object.optional().members({
      emission: schema.date.optional(),
      expirationDate: schema.date.optional(),
    }),
  })

  public messages = {
    'type.enum': 'Attachment type should be avatar, rg, cnh, id, or proof_of_address',
    'pathFront.size': 'Front file size is more than 5mb',
    'pathFront.extnames': 'Front file extension should be png, jpg, jpeg or pdf',
    'pathBack.size': 'Back file size is more than 5mb',
    'pathBack.extnames': 'Back file extension should be png, jpg, jpeg or pdf',
  }
}
