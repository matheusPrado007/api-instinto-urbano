const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const buckt = require("./firebase");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Tamanho máximo do arquivo em bytes (neste exemplo, 5 MB)
  },
  fileFilter: (req: any, file: any, cb: any) => {
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

  const file = buckt.file(nomeArquivo);
  const stream = file.createWriteStream({
    metadata: {
      contentType: imagem.mimetype,
    },
  });

  stream.on("error", (e: any) => {
    console.log(e);
    next(e);
  });

  stream.on("finish", async () => {
    await file.makePublic();
    req.file.firebaseUrl = `https://storage.googleapis.com/${buckt.name}/${nomeArquivo}`;
    next();
  });

  stream.end(imagem.buffer);
};

module.exports = { upload, uploadToStorage };
