import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import bucket from "./firebase";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Tamanho máximo do arquivo em bytes (neste exemplo, 5 MB)
  },
  fileFilter: (req, file, cb) => {
    // Verifica se o arquivo é uma imagem (opcional)
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("O arquivo enviado não é uma imagem."));
    }
  },
});

// Middleware para fazer o upload do arquivo para o Firebase Storage
const uploadToStorage = (req: any, res: any, next: any) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhuma imagem foi enviada." });
  }
  const imagem = req.file;
  const nomeArquivo = `${uuidv4()}.jpg`;
  const file = bucket.file(nomeArquivo);
  const stream = file.createWriteStream({
    metadata: {
      contentType: imagem.mimetype,
    },
  });
  stream.on("error", (e) => {
    console.log(e);
    next(e);
  });
  stream.on("finish", async () => {
    await file.makePublic();
    req.file.firebaseUrl = `https://storage.googleapis.com/${bucket.name}/${nomeArquivo}`;
    next();
  });
  stream.end(imagem.buffer);
};

export { upload, uploadToStorage };

