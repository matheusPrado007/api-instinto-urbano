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
exports.uploadToStorage = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const firebase_1 = __importDefault(require("./firebase"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Tamanho máximo do arquivo em bytes (neste exemplo, 5 MB)
    },
    fileFilter: (req, file, cb) => {
        // Verifica se o arquivo é uma imagem (opcional)
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(new Error("O arquivo enviado não é uma imagem."));
        }
    },
});
exports.upload = upload;
// Middleware para fazer o upload do arquivo para o Firebase Storage
const uploadToStorage = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: "Nenhuma imagem foi enviada." });
    }
    const imagem = req.file;
    const nomeArquivo = `${(0, uuid_1.v4)()}.jpg`;
    const file = firebase_1.default.file(nomeArquivo);
    const stream = file.createWriteStream({
        metadata: {
            contentType: imagem.mimetype,
        },
    });
    stream.on("error", (e) => {
        console.log(e);
        next(e);
    });
    stream.on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
        yield file.makePublic();
        req.file.firebaseUrl = `https://storage.googleapis.com/${firebase_1.default.name}/${nomeArquivo}`;
        next();
    }));
    stream.end(imagem.buffer);
};
exports.uploadToStorage = uploadToStorage;
