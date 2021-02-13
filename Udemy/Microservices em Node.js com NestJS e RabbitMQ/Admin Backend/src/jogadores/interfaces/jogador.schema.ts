import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema({
    email: { type: String, unique: true},
    telefoneCelular: { type: String},
    nome: String,
    categoria: {type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
    ranking: String,
    posicaoRanking: Number,
    urlFotoJogador: String,
}, {timestamps: true, collection: 'jogadores'});
