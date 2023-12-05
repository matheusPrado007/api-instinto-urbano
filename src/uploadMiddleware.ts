const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const buckt = require("./firebase");
const storage = multer.memoryStorage();

//create

const singleUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req: any, file: any, cb: any) => {

    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("O arquivo enviado não é uma imagem."));
    }
  },
}).single('imagem');


const multipleUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req: any, file: any, cb: any) => {

    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("O arquivo enviado não é uma imagem."));
    }
  },
}).array('imagens', 2);  // 

const uploadToStorage = (req: any, res: any, next: any) => {
  try {
    let files;

    if (!req.file) {
      return res.status(400).json({ error: "Nenhuma imagem foi enviada." });
    }

    const imagem = req.file;

    const nomeFoto = `${uuidv4()}.jpg`;
    req.body.nomeFoto = nomeFoto;

    const file = buckt.file(nomeFoto);
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
      imagem.firebaseUrl = `https://storage.googleapis.com/${buckt.name}/${nomeFoto}`;

      next();
    });

    stream.end(imagem.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer upload da imagem para o Firebase Storage" });
  }
};

const uploadToStorageMultiple = (req: any, res: any, next: any) => {
  try {
    let files;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Nenhuma imagem foi enviada." });
    }

    req.body.nomeArquivoPerfil = `${uuidv4()}.jpg`;
    req.body.nomeArquivoCapa = `${uuidv4()}.jpg`;

    files = req.files;

    files.forEach((imagem: any, index: any) => {
      const nomeArquivo = index === 0 ? req.body.nomeArquivoPerfil : req.body.nomeArquivoCapa;

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

      });

      stream.end(imagem.buffer);
    });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer upload das imagens para o Firebase Storage" });
  }
};

// Update

const updateToStorage = (req: any, res: any, next: any) => {
  try {
    // Verifica se há uma imagem no corpo da requisição
    if (!req.file) {
      // Se não houver imagem, passe para o próximo middleware
      return next();
    }

    const imagem = req.file;

    const nomeFoto = `${uuidv4()}.jpg`;
    req.body.nomeFoto = nomeFoto;

    const file = buckt.file(nomeFoto);
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
      imagem.firebaseUrl = `https://storage.googleapis.com/${buckt.name}/${nomeFoto}`;

      next();
    });

    stream.end(imagem.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer upload da imagem para o Firebase Storage" });
  }
};


const updateToStorageMultiple = async (req: any, res: any, next: any) => {
  try {
    let files;

    if (!req.files || req.files.length === 0) {
      console.log(req.files);

     return next();
    }


    files = req.files;

    files.forEach((imagem: any, index: any) => {
      const nomeArquivo = index === 0 ? req.body.nomeArquivoPerfil = `${uuidv4()}.jpg` : req.body.nomeArquivoCapa = `${uuidv4()}.jpg`;

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

      });

      stream.end(imagem.buffer);
    });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer upload das imagens para o Firebase Storage" });
  }
};



//Delete

const deleteFromStorage = async (nomeArquivo: any) => {
  try {
    const file = buckt.file(nomeArquivo);

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


module.exports = {
  singleUpload, multipleUpload,
  uploadToStorage, deleteFromStorage,
  uploadToStorageMultiple, updateToStorage,
  updateToStorageMultiple
};
