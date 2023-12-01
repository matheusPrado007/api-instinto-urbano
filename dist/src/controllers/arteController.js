"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = exports.remove = exports.create = void 0;
const fs_1 = __importDefault(require("fs"));
const Arte_1 = __importDefault(require("../models/Arte"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome_artista, nome, uf, cidade, descricao, endereco } = req.body;
        const file = req.file.firebaseUrl;
        console.log(file);
        console.log(nome_artista, nome, uf, cidade, descricao, endereco);
        if (!file) {
            return res.status(400).json({ message: "Nenhuma imagem foi enviada." });
        }
        const arte = new Arte_1.default({
            nome_artista,
            nome,
            foto: file,
            descricao,
            uf,
            cidade,
            endereco,
        });
        console.log(arte);
        yield arte.save();
        console.log(arte);
        res.status(201).json(arte);
    }
    catch (err) {
        console.error("Erro ao salvar a imagem:", err);
        res.status(500).json({ message: "Erro interno ao salvar a imagem." });
    }
});
exports.create = create;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arte = yield Arte_1.default.findById(req.params.id);
        if (!arte) {
            return res.status(404).json({ message: "Imagem não encontrada" });
        }
        fs_1.default.unlinkSync(arte.foto);
        yield arte.remove();
        res.json({ message: "Imagem removida com sucesso" });
    }
    catch (err) {
        res.status(500).json({ message: "Erro ao remover a imagem" });
    }
});
exports.remove = remove;
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arte = yield Arte_1.default.find();
        res.json(arte);
    }
    catch (err) {
        res.status(500).json({ message: "Erro ao buscar as imagens." });
    }
});
exports.findAll = findAll;
