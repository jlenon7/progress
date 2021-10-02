export class CreateAttachmentDto {
  ownerId: string
  token: string
  serviceToken: string
  title?: string
  icon?: string
  type?: 'avatar' | 'rg' | 'cnh' | 'cpf' | 'id' | 'proof_of_address' | 'mock'
  mime?: {
    pathBack?: {
      url?: string
      path: string
      size: string
      originalName: string
      extension: string
    }
    pathFront?: {
      url?: string
      path: string
      size: string
      originalName: string
      extension: string
    }
  }

  document?: {
    number?: string
    emission?: string
    expirationDate?: string
  }

  signedBackUrl?: string
  signedFrontUrl?: string

  status?: 'pendent' | 'canceled' | 'actived' | 'deleted'
}
