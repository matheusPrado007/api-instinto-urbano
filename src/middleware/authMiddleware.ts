import { Response, NextFunction } from 'express';
import { verifyToken } from '../auth/jwtService';
import { ExtendedRequest, DecodedToken } from '../types/MidldlewareTypes'



const authenticateToken = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization');

  if (!token) {
    console.error('Token não fornecido.');
    return res.status(401).send('Access denied.');
  }

  try {
    const decoded = verifyToken(token) as DecodedToken;

    // Adicione informações do token decodificado ao request
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    res.status(400).send('Invalid token.');
  }
};

export { authenticateToken };
