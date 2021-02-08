export class UpdateApplicationDto {
  name: string
  email: string
  password: string
  status?: 'pendent' | 'canceled' | 'actived' | 'deleted'
}
