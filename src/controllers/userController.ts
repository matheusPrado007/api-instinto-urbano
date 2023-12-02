const fsUser = require("fs");
const User = require("../models/User");

exports.create = async (req: any, res: any) => {
  try {
    const { username, email, senha } = req.body;
    const fotos = req.files.find((file: any) => file.fieldname === 'imagens');
    console.log("fotos: ", fotos);
    
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    console.log('req.files.originalname:', req.files[0].firebaseUrl);


    if (!fotos) {
      return res.status(400).json({ message: "Ambas as imagens de perfil e capa são necessárias." });
    }

    const user = new User({
      username,
      email,
      senha,
      foto_perfil: req.files[0].originalname,
      foto_capa: req.files[1].originalname,
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
    fsUser.unlinkSync(user.foto_perfil);
    fsUser.unlinkSync(user.foto_capa);
    await user.remove();
    res.json({ message: "Usuário removido com sucesso" });
  } catch (err) {
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
