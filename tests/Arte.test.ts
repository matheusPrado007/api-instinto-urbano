import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { create, update, remove, findAll } from './../src/controllers/arteController';
import Arte from '../src/models/Arte';


jest.mock('bcrypt');

let req: Partial<Request>;
let res: Partial<Response>;

beforeEach(() => {
    jest.clearAllMocks();
    req = { body: {} };
    res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
});

describe('Arte Controller - create', () => {
    it('Deve criar uma arte com sucesso', async () => {

        req.body = {
            nome_artista: 'h.p.lovecract',
            nome: 'call of cthulhu',
            nomeFoto: 'arte.jpg',
            descricao: 'livro do lovecraft',
            uf: 'state',
            cidade: 'state',
            endereco: 'state',
        };

        jest.spyOn(Arte.prototype, 'save').mockResolvedValueOnce({ _id: 'someId', ...req.body } as any);

        await create(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nome_artista: 'h.p.lovecract' }));
    });

    it('Deve retornar um erro se os nomes dos arquivos não forem fornecidos', async () => {
        // Não simule o nome do arquivo para provocar um erro
        req.body = {
            descricao: 'livro do lovecraft',
            uf: 'state',
            cidade: 'state',
            endereco: 'state',
        };

        await create(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Nenhuma imagem foi enviada.' });
    });
});

describe('Arte Controller - update', () => {
    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('deve atualizar um usuário com sucesso', async () => {
        jest.spyOn(Arte, 'findById').mockResolvedValueOnce({
            _id: "someId",
            nome_artista: 'h.p.lovecract',
            nome: 'call of cthulhu',
            foto: 'arte.jpg',
            descricao: 'livro do lovecraft',
            uf: 'state',
            cidade: 'state',
            endereco: 'state',
            save: jest.fn(),
        } as any);

        req.body = {
            nome_artista: 'h.p',
            nome: 'Montanhas da Loucura',
        };


        await update(req as Request, res as Response);


        expect(res.json).toHaveBeenCalledWith({ message: "Update realizado" });
    });


    it('deve retornar um erro se o usuário não for encontrado', async () => {
        // Simulando User.findById para retornar null
        jest.spyOn(Arte, 'findById').mockResolvedValueOnce(null);

        await update(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Arte não encontrada" });
    });


    it('deve lidar com atualizações de dados', async () => {
        jest.spyOn(Arte, 'findById').mockResolvedValueOnce({
            _id: "someId",
            nome_artista: 'h.p.lovecract',
            nome: 'call of cthulhu',
            foto: 'arte.jpg',
            descricao: 'livro do lovecraft',
            uf: 'state',
            cidade: 'state',
            endereco: 'state',
            save: jest.fn(),
        } as any);

        req.body = {
            username: 'updatedUser',
        };

        await update(req as Request, res as Response);
        expect(res.json).toHaveBeenCalledWith({ message: "Update realizado" });
    });

    it('deve lidar com id inexistente', async () => {
        jest.spyOn(Arte, 'findById').mockResolvedValueOnce(null);

        await update(req as Request, res as Response);
        expect(res.json).toHaveBeenCalledWith({ message: 'Arte não encontrada' });
    });

    it('deve lidar com atualizações de arquivos', async () => {
        jest.spyOn(Arte, 'findById').mockResolvedValueOnce({
            _id: "someId",
            nome_artista: 'h.p.lovecract',
            nome: 'call of cthulhu',
            foto: 'arte.jpg',
            descricao: 'livro do lovecraft',
            uf: 'state',
            cidade: 'state',
            endereco: 'state',
            save: jest.fn(),
        } as any);

        req.body = {
            nomeFoto: 'foto',
        };

        await update(req as Request, res as Response);
        expect(res.json).toHaveBeenCalledWith({ message: "Imagem atualizada com sucesso" });

    });
});