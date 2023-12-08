const fsUser = require("fs");
const User = require("../models/User");
const firebase = require("../uploadMiddleware"); 
const bcrypt = require('bcrypt');
const auth = require('../auth/jwtService');



exports.create = async (req: any, res: any) => {
  try {
    const { username, email, senha, descricao_perfil, nomeArquivoPerfil, nomeArquivoCapa } = req.body;

    if (!nomeArquivoPerfil || !nomeArquivoCapa) {
      return res.status(400).json({ message: "Nomes dos arquivos não fornecidos." });
    }

    // Hash da senha antes de salvar no banco de dados
    const hashedSenha = await bcrypt.hash(senha, 10);

    const user = new User({
      username,
      email,
      senha: hashedSenha,
      descricao_perfil,
      foto_perfil: nomeArquivoPerfil,
      foto_capa: nomeArquivoCapa,
    });

    // Log para depuração
    console.log('Usuário criado:', user);

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error("Erro ao salvar as imagens:", err);
    res.status(500).json({ message: "Erro interno ao salvar as imagens." });
  }
};


exports.update = async (req: any, res: any, next: any) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const files: any = req.files;

    // Itere sobre cada campo no objeto de arquivos
    if (files) {
      Object.keys(files).forEach((fieldname: string) => {
        const imagem = files[fieldname][0];

        // Lógica para processar cada imagem
        if (fieldname === 'foto_perfil') {
          firebase.deleteFromStorage(user.foto_perfil);
          user.foto_perfil = req.body.nomeArquivoPerfil;
        } else if (fieldname === 'foto_capa') {
          firebase.deleteFromStorage(user.foto_capa);
          user.foto_capa = req.body.nomeArquivoCapa;
        }
      });
    }

    // Atualize todos os campos fornecidos na requisição
    const camposAtualizados = ['username', 'email', 'senha', 'descricao_perfil'];

    camposAtualizados.forEach((campo) => {
      if (req.body[campo] !== undefined) {
        user[campo] = req.body[campo];
      }
    });

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

exports.loginPost =  async (req: any, res: any) => {
  const { email, senha } = req.body;
console.log(senha);

  try {
      // Verifique as credenciais do usuário no seu modelo User
      const user = await User.findOne({ email });
      console.log(typeof user.senha);
      

      if (!user) {
          return res.status(401).json({ message: 'Credenciais inválidas. user' });
      }

      if (typeof user.senha !== 'string') {
          return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      // Compare a senha fornecida com a senha hash no banco de dados
      const senhaValida = await bcrypt.compare(senha, user.senha);

      if (!senhaValida) {
          return res.status(401).json({ message: 'Credenciais inválidas. invalida' });
      }

      // Gere um token JWT
      const token = auth.generateToken(user._id);

      res.json({ token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};