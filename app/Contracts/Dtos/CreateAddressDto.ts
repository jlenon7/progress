export class CreateAddressDto {
  owner_id: string
  token: string
  service_token: string
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
