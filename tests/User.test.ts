import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { create, update, remove } from './../src/controllers/userController';
import User from '../src/models/User';
import ExtendedRequest from '../src/types/UserTypes';
import { deleteFromStorage } from '../src/middleware/uploadMiddleware';


jest.mock('bcrypt');

let req: Partial<Request>;
let res: Partial<Response>;
const mockResponse = (): Response => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
};
describe('User Controller - create', () => {

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


    it('Deve criar um usuário com sucesso', async () => {
        req.body = {
            username: 'testuser',
            email: 'test@example.com',
            senha: 'testpassword',
            descricao_perfil: 'test description',
            nomeArquivoPerfil: 'profile.jpg',
            nomeArquivoCapa: 'cover.jpg',
        };

        (bcrypt as any).hash.mockResolvedValue('hashedpassword');
        jest.spyOn(User.prototype, 'save').mockResolvedValueOnce({ _id: 'someId', ...req.body } as any);

        await create(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(201); // Corrigido para verificar o status 201
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ username: 'testuser' }));
    });


    it('Deve retornar um erro se os nomes dos arquivos não forem fornecidos', async () => {
        req.body = {
            username: 'testuser',
            email: 'test@example.com',
            senha: 'testpassword',
            descricao_perfil: 'test description',
            // Missing nomeArquivoPerfil and nomeArquivoCapa
        };

        await create(req as ExtendedRequest, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Nomes dos arquivos não fornecidos.' });
    });
});

describe('User Controller - update', () => {
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
        jest.spyOn(User, 'findById').mockResolvedValueOnce({
            _id: 'someId',
            username: 'userUser',
            email: 'user@example.com',
            senha: 'userPassword',
            descricao_perfil: 'user description',
            foto_perfil: 'existingProfile.jpg',
            foto_capa: 'existingCover.jpg',
            save: jest.fn(),
        } as any);

        req.body = {
            username: 'updatedUser',
            email: 'updated@example.com',
            senha: 'updatedPassword',
            descricao_perfil: 'updated description',
        };

        const nextMock = jest.fn();


        await update(req as Request, res as Response, nextMock);


        expect(res.json).toHaveBeenCalledWith({ message: 'Usuário atualizado com sucesso' });
        expect(nextMock).not.toHaveBeenCalled();
    });


    it('deve retornar um erro se o usuário não for encontrado', async () => {
        // Simulando User.findById para retornar null
        jest.spyOn(User, 'findById').mockResolvedValueOnce(null);

        await update(req as Request, res as Response, () => { });

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
    });


    it('deve lidar com atualizações de arquivos', async () => {
        jest.spyOn(User, 'findById').mockResolvedValueOnce({
            _id: 'someId',
            foto_perfil: 'profile.jpg',
            foto_capa: 'cover.jpg',
            save: jest.fn(),
        } as any);

        req.body = {
            username: 'updatedUser',
        };

        req.files = {
            nomeArquivoPerfil: 'existingProfile.jpg',
            nomeArquivoCapa: 'existingCover.jpg'
        } as any;


        const nextMock = jest.fn();


        await update(req as Request, res as Response, nextMock);
        expect(res.json).toHaveBeenCalledWith({ message: 'Usuário atualizado com sucesso' });
    });

});

describe('User Controller - remove', () => {
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

    it('deve remover arquivos', async () => {

        const user = {
            _id: 'someId',
            foto_perfil: 'profile.jpg',
            foto_capa: 'cover.jpg',
            save: jest.fn(),
            remove: jest.fn(),
        } as any;

        jest.spyOn(User, 'findById').mockResolvedValueOnce(user);

        const res = mockResponse();
        const req = { params: { id: 'someId' } } as unknown as Request;

        await remove(req, res)

        expect(res.json).toHaveBeenCalledWith({ message: 'Usuário removido com sucesso' });
    });

    it('deve retornar um erro se o usuário não for encontrado ao tentar remover', async () => {
        // Simulando User.findById para retornar null
        jest.spyOn(User, 'findById').mockResolvedValueOnce(null);
        const res = mockResponse();
        const req = { params: { id: 'someId' } } as unknown as Request;

        await remove(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
    });
});