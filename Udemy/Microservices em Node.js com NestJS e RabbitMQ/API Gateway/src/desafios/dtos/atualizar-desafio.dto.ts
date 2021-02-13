import { DesafioStatus } from '../desafio-status.enum';
import { IsOptional } from 'class-validator';

export class AtualizarDesafioDto {

  @IsOptional()
  status: DesafioStatus;

}
