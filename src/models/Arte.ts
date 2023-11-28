import { ArteType } from "../types/ArteType";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const arteSchema = new Schema<ArteType>({
  nome_artista: { type: String, required: true },
  nome: { type: String, required: true },
  foto: { type: String, required: true },
  descricao: { type: String, required: true },
  uf: { type: String, required: true },
  cidade: { type: String, required: true },
  endereco: { type: String, required: true },
});

export default mongoose.model("Arte", arteSchema);
