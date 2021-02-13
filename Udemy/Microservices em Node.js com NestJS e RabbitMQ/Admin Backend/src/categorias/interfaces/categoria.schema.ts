import * as mongoose from "mongoose";

export const CategoriaSchema = new mongoose.Schema({
    categoria: {type: String, unique: true},
    descricao: {type: String},
    eventos: [
        {
            nome: { type: String },
            operacao: { type: String },
            valor: { type: Number }
        }
    ]
}, {timestamps: true, collection: 'categorias'});