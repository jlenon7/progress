import { IsNotEmpty, IsString } from 'class-validator'
import { CreateContactDto } from 'app/Contracts/Dtos/CreateContactDto'

export class CreateContactValidator extends CreateContactDto {
  @IsString()
  @IsNotEmpty()
  ownerId: string
}
