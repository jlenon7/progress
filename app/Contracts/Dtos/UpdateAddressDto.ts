export class UpdateAddressDto {
  title?: string
  street?: string
  number?: string
  district?: string
  complement?: string
  city?: string
  state?: string
  country?: string
  zip_code?: string
  status?: 'pendent' | 'canceled' | 'actived' | 'deleted'
}
