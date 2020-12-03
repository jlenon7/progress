import { Schema } from 'mongoose'

export const CategoriaSchema = new Schema(
  {
    categoria: { type: String, unique: true },
    descricao: String,
    eventos: [
      {
        nome: String,
        operacao: String,
        valor: Number,
      },
    ],
    jogadores: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Jogador',
      },
    ],
  },
  { timestamps: true, collection: 'categorias' },
)
