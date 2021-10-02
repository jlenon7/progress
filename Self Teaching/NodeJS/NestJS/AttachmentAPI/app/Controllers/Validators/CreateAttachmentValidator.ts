import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import { CreateAttachmentDto } from 'app/Contracts/Dtos/CreateAttachmentDto'

export class CreateAttachmentValidator extends CreateAttachmentDto {
  @IsString()
  @IsNotEmpty()
  ownerId: string

  @IsString()
  @IsNotEmpty()
  @IsIn(['avatar', 'rg', 'cnh', 'cpf', 'id', 'proof_of_address', 'mock'])
  type: 'avatar' | 'rg' | 'cnh' | 'cpf' | 'id' | 'proof_of_address' | 'mock'
}
