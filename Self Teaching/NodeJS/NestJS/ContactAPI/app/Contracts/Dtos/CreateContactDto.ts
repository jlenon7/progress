export class CreateContactDto {
  ownerId: string
  token: string
  serviceToken: string
  title?: string
  type?:
    | 'email'
    | 'cellphone'
    | 'phone'
    | 'whatsapp'
    | 'telegram'
    | 'facebook'
    | 'instagram'
    | 'linkedin'
    | 'site'

  contact?: string
  status?: 'pendent' | 'canceled' | 'actived' | 'deleted'
}
