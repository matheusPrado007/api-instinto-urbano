import mongoose from 'mongoose';

const { Schema } = mongoose;

const ArteSchema = new Schema({
  username: { type: String, required: true },
  nome_artista: { type: String, required: true },
  nome_livro: { type: String, required: true },
  foto: { type: String, required: true },
  descricao: { type: String, required: true },
  livro: { type: String, required: true },
});

export default mongoose.model('Arte', ArteSchema);
