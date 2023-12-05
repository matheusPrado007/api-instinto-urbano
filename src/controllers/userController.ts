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


exports.update = async (req: any, res: any) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (req.body.nomeArquivoPerfil !== undefined) {
      await firebase.deleteFromStorage(user.foto_perfil);
      user.foto_perfil = req.body.nomeArquivoPerfil;
    }

    if (req.body.nomeArquivoCapa !== undefined) {
      await firebase.deleteFromStorage(user.foto_capa);
      user.foto_capa = req.body.nomeArquivoCapa;
    }

    // Atualize apenas os campos fornecidos na requisição
    const camposAtualizados = ['username', 'email', 'senha', 'descricao_perfil'];

    camposAtualizados.forEach((campo) => {
      if (req.body[campo] !== undefined) {
        user[campo] = req.body[campo];
      }
    });

    // Salve as alterações
    await user.save();

    res.json({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar o usuário:", err);
    res.status(500).json({ message: "Erro ao atualizar o usuário" });
  }
};



exports.remove = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Chame o middleware para remover os arquivos do Firebase Storage
    await firebase.deleteFromStorage(user.foto_perfil);
    await firebase.deleteFromStorage(user.foto_capa);

    // Remova o usuário do banco de dados
    await user.remove();
    res.json({ message: "Usuário removido com sucesso" });
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
