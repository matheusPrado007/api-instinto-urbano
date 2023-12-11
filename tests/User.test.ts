import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { create } from './../src/controllers/userController'; 
import User from '../src/models/User';

jest.mock('bcrypt');

describe('User Controller - create', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

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

    await create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Nomes dos arquivos não fornecidos.' });
  });

});
