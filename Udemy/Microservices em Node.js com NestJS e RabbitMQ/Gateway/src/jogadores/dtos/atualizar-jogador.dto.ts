import { IsNotEmpty, IsOptional } from 'class-validator'

export class AtualizarJogadorDto {
  @IsNotEmpty()
  readonly telefoneCelular?: string

  @IsNotEmpty()
  readonly nome?: string

  @IsOptional()
  categoria?: string

  @IsOptional()
  urlFotoJogador?: string
}
