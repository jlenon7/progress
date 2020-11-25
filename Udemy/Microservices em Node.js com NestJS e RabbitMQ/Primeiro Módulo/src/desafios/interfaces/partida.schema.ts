import * as mongoose from 'mongoose'

export const PartidaSchema = new mongoose.Schema(
  {
    categoria: String,
    jogadores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
      },
    ],
    def: { type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' },
    resultado: [{ set: { type: String } }],
  },
  { timestamps: true, collection: 'partidas' },
)
