import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import ExtendedRequest from '../types/UserTypes';
import User from '../models/User';
import { deleteFromStorage } from '../middleware/uploadMiddleware';
import { generateToken } from '../auth/jwtService';

export const create = async (req: Request, res: Response) => {
  try {
    const { username, email, senha, descricao_perfil, nomeArquivoPerfil, nomeArquivoCapa } = req.body;

    if (!nomeArquivoPerfil || !nomeArquivoCapa) {
      return res.status(400).json({ message: 'Nomes dos arquivos não fornecidos.' });
    }

    const hashedSenha = await bcrypt.hash(senha, 10) as string;

    const user = new User({
      username,
      email,
      senha: hashedSenha,
      descricao_perfil,
      foto_perfil: nomeArquivoPerfil,
      foto_capa: nomeArquivoCapa,
    });

    console.log('Usuário criado:', user);

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno ao salvar as imagens.' });
  }
};

export const update = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.params?.id;
    const user: any = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const files: any = req.files;

    if (files) {
      Object.keys(files).forEach((fieldname: string) => {
        const imagem = files[fieldname][0];

        // Lógica para processar cada imagem
        if (fieldname === 'foto_perfil') {
          deleteFromStorage(user.foto_perfil);
          user.foto_perfil = req.body.nomeArquivoPerfil;
        } else if (fieldname === 'foto_capa') {
          deleteFromStorage(user.foto_capa);
          user.foto_capa = req.body.nomeArquivoCapa;
        }
      });
    }

    const camposAtualizados = ['username', 'email', 'senha', 'descricao_perfil'];

    camposAtualizados.forEach((campo) => {
      if (req.body[campo] !== undefined) {
        user[campo] = req.body[campo];
      }
    });

    await user.save();

    res.json({ message: 'Usuário atualizado com sucesso' });
  } catch (err: any) {
    res.status(500).json({ message: 'Erro ao atualizar o usuário' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await deleteFromStorage(user.foto_perfil);
    await deleteFromStorage(user.foto_capa);

    await user.remove();
    res.json({ message: 'Usuário removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover o usuário' });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar os usuários.' });
  }
};

export const loginPost = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const user: any = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas. user' });
    }

    if (typeof user.senha !== 'string') {
      return res.status(401).json({ message: 'Credenciais inválidas typeof não é string.' });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas, erro bcript' });
    }

    const token = generateToken(user._id);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor, loginPost.' });
  }
};
