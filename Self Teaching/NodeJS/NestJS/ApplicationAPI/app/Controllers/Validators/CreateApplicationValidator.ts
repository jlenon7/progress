import { IsNotEmpty, IsString } from 'class-validator'
import { CreateApplicationDto } from 'app/Contracts/Dtos/CreateApplicationDto'

export class CreateApplicationValidator extends CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  prefix: string
}
