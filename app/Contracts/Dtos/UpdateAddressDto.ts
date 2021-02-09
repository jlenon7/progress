export class UpdateAddressDto {
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
