import Arte from "../models/Arte";
import { Request, Response } from 'express';
import { deleteFromStorage } from "../middleware/uploadMiddleware";

export const create = async (req: Request, res: Response) => {
  try {
    const { nome_artista, nome, uf, cidade, descricao, endereco } = req.body;
    const nomeDoArquivoFirebase = req.body.nomeFoto;

    if (!nomeDoArquivoFirebase) {
      return res.status(400).json({ message: "Nenhuma imagem foi enviada." });
    }

    const arte = new Arte({
      nome_artista,
      nome,
      foto: nomeDoArquivoFirebase,
      descricao,
      uf,
      cidade,
      endereco,
    });

    await arte.save();
    res.status(201).json(arte);
  } catch (err) {
    console.error("Erro ao salvar a imagem:", err);
    res.status(500).json({ message: "Erro interno ao salvar a imagem." });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const arteId = req.params.id;
    const arte: any = await Arte.findById(arteId);
    console.log('tipo da arte', typeof arte);
    

    if (!arte) {
      return res.status(404).json({ message: "Imagem não encontrada" });
    }

    if (req.body.nomeFoto) {
      // Excluir a imagem antiga
      await deleteFromStorage(arte.foto);
      arte.foto = req.body.nomeFoto;

      // Salvar as alterações
      await arte.save();

      return res.json({ message: "Imagem atualizada com sucesso" });
    }

    const camposAtualizados = ["nome_artista", "nome", "uf", "cidade", "descricao", "endereco"];

    camposAtualizados.forEach((campo) => {
      if (req.body[campo]) {
        arte[campo] = req.body[campo];
      }
    });

    // Salvar as alterações
    await arte.save();

    res.json({ message: "Update realizado" });
  } catch (err) {
    console.error("Erro ao atualizar a imagem:", err);
    res.status(500).json({ message: "Erro ao atualizar a imagem" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const arteId = req.params.id;
    const arte = await Arte.findById(arteId);

    if (!arte) {
      return res.status(404).json({ message: "Imagem não encontrada" });
    }

    // Excluir a imagem do Firebase Storage
    await deleteFromStorage(arte.foto);

    // Remover a arte do banco de dados
    await arte.remove();

    res.json({ message: "Imagem removida com sucesso" });
  } catch (err) {
    console.error("Erro ao remover a imagem:", err);
    res.status(500).json({ message: "Erro ao remover a imagem" });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const arte = await Arte.find();
    res.json(arte);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar as imagens." });
  }
};
