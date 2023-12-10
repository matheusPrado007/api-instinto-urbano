import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  descricao_perfil: { type: String, required: true },
  foto_perfil: { type: String, required: true },
  foto_capa: { type: String, required: true },
});

export default mongoose.model("User", UserSchema);

