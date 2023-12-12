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