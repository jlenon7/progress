import * as mongoose from 'mongoose';

export const PartidaSchema = new mongoose.Schema({

    desafio: { type: mongoose.Schema.Types.ObjectId },
    categoria: {type: mongoose.Schema.Types.ObjectId},
    jogadores: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    def: { type: mongoose.Schema.Types.ObjectId },
    resultado: [
        { set: {type: String} }
    ]        

}, {timestamps: true, collection: 'partidas' })