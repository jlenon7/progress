import { Document } from 'mongoose'
import { IJogador } from 'src/jogadores/interfaces/jogador.interface'

import { DesafioStatus } from './desafio-status.enum'

export interface IDesafio extends Document {
  dataHoraDesafio: Date
  status: DesafioStatus
  dataHoraSolicitacao: Date
  dataHoraResposta: Date
  solicitante: IJogador
  categoria: string
  jogadores: IJogador[]
  partida: IPartida
}

export interface IPartida extends Document {
  categoria: string
  jogadores: IJogador[]
  def: IJogador
  resultado: IResultado[]
}

export interface IResultado {
  set: string
}
