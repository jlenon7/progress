import { Document } from 'mongoose';
import { DesafioStatus } from '../desafio-status.enum'

export interface Desafio extends Document {

    dataHoraDesafio: Date
    status: DesafioStatus
    dataHoraSolicitacao: Date
    dataHoraResposta?: Date
    solicitante: string
    categoria: string
    partida?: string
    jogadores: string[]
    
}