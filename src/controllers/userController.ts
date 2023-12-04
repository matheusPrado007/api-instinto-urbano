const fsUser = require("fs");
const User = require("../models/User");
const firebase = require("../uploadMiddleware"); 


exports.create = async (req: any, res: any) => {
  try {
    const { username, email, senha, descricao_perfil, nomeArquivoPerfil, nomeArquivoCapa } = req.body;

    if (!nomeArquivoPerfil || !nomeArquivoCapa) {
      return res.status(400).json({ message: "Nomes dos arquivos não fornecidos." });
    }

    const user = new User({
      username,
      email,
      senha,
      descricao_perfil,
      foto_perfil: nomeArquivoPerfil,
      foto_capa: nomeArquivoCapa,
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error("Erro ao salvar as imagens:", err);
    res.status(500).json({ message: "Erro interno ao salvar as imagens." });
  }
};



exports.remove = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Adicione o nome do arquivo ao req.body
    req.body.nomeDoArquivoPerfil = user.foto_perfil;
    req.body.nomeDoArquivoCapa = user.foto_capa;

    // Chame o middleware para remover os arquivos do Firebase Storage
    await firebase.removeFromStorage(req, res, async () => {
      // Remova o usuário do banco de dados
      await user.remove();
      res.json({ message: "Usuário removido com sucesso" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao remover o usuário" });
  }
};


exports.findAll = async (req: any, res: any) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar os usuários." });
  }
};
