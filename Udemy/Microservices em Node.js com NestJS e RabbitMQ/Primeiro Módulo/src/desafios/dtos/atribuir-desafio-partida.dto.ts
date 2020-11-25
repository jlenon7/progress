import { IsNotEmpty } from 'class-validator'
import { IResultado } from '../interfaces/desafio.interface'
import { IJogador } from '../../jogadores/interfaces/jogador.interface'

export class AtribuirDesafioPartidaDto {
  @IsNotEmpty()
  def: IJogador

  @IsNotEmpty()
  resultado: IResultado
}
