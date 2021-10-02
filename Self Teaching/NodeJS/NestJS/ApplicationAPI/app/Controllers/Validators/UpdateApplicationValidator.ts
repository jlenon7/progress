import { IsNotEmpty, IsString } from 'class-validator'
import { UpdateApplicationDto } from 'app/Contracts/Dtos/UpdateApplicationDto'

export class UpdateApplicationValidator extends UpdateApplicationDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  email: string
}
