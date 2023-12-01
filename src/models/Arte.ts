const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  nome_artista: { type: String, required: true },
  nome: { type: String, required: true },
  foto: { type: String, required: true },
  descricao: { type: String, required: true },
  uf: { type: String, required: true },
  cidade: { type: String, required: true },
  endereco: { type: String, required: true },
});

module.exports = mongoose.model("Picture", PictureSchema);
