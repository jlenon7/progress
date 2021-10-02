export class CreateAddressDto {
  ownerId: string
  token: string
  serviceToken: string
  title?: string
  street?: string
  number?: string
  district?: string
  complement?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
  status?: 'pendent' | 'canceled' | 'actived' | 'deleted'
}
