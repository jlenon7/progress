export class UpdateContactDto {
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
