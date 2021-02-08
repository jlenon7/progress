export class CreateApplicationDto {
  name: string
  email: string
  password: string
  token: string
  prefix: string
  status?: 'pendent' | 'canceled' | 'actived' | 'deleted'
}
