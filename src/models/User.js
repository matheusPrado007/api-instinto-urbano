"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    descricao_perfil: { type: String, required: true },
    foto_perfil: { type: String, required: true },
    foto_capa: { type: String, required: true },
});
exports.default = mongoose_1.default.model("User", UserSchema);
