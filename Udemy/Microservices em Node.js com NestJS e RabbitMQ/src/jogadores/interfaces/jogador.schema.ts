import { Schema } from 'mongoose'

export const JogadorSchema = new Schema({
  telefoneCelular: { type: String, unique: true },
  email: { type: String, unique: true },
  nome: String,
  ranking: String,
  posicaoRanking: Number,
  urlFotoJogador: String,
}, { timestamps: true, collection: 'jogadores' })
