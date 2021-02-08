import { Application } from 'app/Schemas/Application'

export class CreateTokenDto {
  title: string
  application: Application | string
  type:
    | 'forgot_token'
    | 'confirmation_token'
    | 'api_token'
    | 'api_key'
    | 'api_secret'

  ip: string
  token?: string
  value?: string
  status?: 'created' | 'expired' | 'used' | 'in_use'
}
