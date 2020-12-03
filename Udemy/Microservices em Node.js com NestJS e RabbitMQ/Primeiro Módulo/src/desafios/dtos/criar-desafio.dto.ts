import {
  IsNotEmpty,
  IsDate,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsDateString,
} from 'class-validator'
import { IJogador } from 'src/jogadores/interfaces/jogador.interface'

export class CriarDesafioDto {
  @IsNotEmpty()
  @IsDateString()
  dataHoraDesafio: Date

  @IsNotEmpty()
  solicitante: IJogador

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  jogadores: IJogador[]
}
