const mongooseUser = require("mongoose");
const SchemaUser = mongooseUser.Schema;

const UserSchema = new SchemaUser({
    username: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    descricao_perfil: { type: String, required: true },
    foto_perfil: { type: String, required: true },
    foto_capa: { type: String, required: true },
});

module.exports = mongooseUser.model("User", UserSchema);
