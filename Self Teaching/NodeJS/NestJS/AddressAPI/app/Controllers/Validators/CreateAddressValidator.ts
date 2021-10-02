import { IsNotEmpty, IsString } from 'class-validator'
import { CreateAddressDto } from 'app/Contracts/Dtos/CreateAddressDto'

export class CreateAddressValidator extends CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  ownerId: string
}
