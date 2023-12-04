const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const buckt = require("./firebase");

const storage = multer.memoryStorage();

// Configuração para permitir o upload de uma única imagem
const singleUpload = multer({
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
}).single('imagem');  // 'imagem' é o nome do campo que contém a imagem no formulário

// Configuração para permitir o upload de várias imagens
const multipleUpload = multer({
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
}).array('imagens', 2);  // 'imagens' é o nome do campo que contém as imagens no formulário

// Middleware para fazer o upload do arquivo para o Firebase Storage
// Middleware para fazer o upload do arquivo para o Firebase Storage
const uploadToStorage = (req: any, res: any, next: any) => {
  let files;

  if (req.file) {
    // Caso seja um único arquivo
    files = [req.file];
  } else if (req.files && req.files.length > 0) {
    // Caso sejam múltiplos arquivos
    files = req.files;
  } else {
    return res.status(400).json({ error: "Nenhuma imagem foi enviada." });
  }

  // Iterar sobre os arquivos
  files.forEach((imagem: any) => {
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
      imagem.firebaseUrl = `https://storage.googleapis.com/${buckt.name}/${nomeArquivo}`;

      // Adiciona o nome do arquivo ao req.body
      req.body.nomeDoArquivoFirebase = nomeArquivo;

      // Chama a próxima função/middleware
      next();
    });

    stream.end(imagem.buffer);
  });
};



const deleteFromStorage = async (nomeArquivo: any) => {
  try {
    const file = buckt.file(nomeArquivo);

    // Verifica se o arquivo existe antes de tentar excluir
    const [exists] = await file.exists();
    if (exists) {
      await file.delete();
      console.log(`Arquivo ${nomeArquivo} excluído do Firebase Storage`);
    } else {
      console.log(`Arquivo ${nomeArquivo} não encontrado no Firebase Storage`);
    }
  } catch (error) {
    console.error(`Erro ao excluir o arquivo ${nomeArquivo} do Firebase Storage:`, error);
    throw error;
  }
};


module.exports = { singleUpload, multipleUpload, uploadToStorage, deleteFromStorage };
