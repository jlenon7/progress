import { Schema } from 'mongoose'

export const JogadorSchema = new Schema(
  {
    email: { type: String, unique: true },
    nome: String,
    ranking: String,
    posicaoRanking: Number,
    urlFotoJogador: String,
    telefoneCelular: String,
  },
  { timestamps: true, collection: 'jogadores' },
)
