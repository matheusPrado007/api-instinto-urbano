const adminFire = require('firebase-admin');
const jwtService = require('../auth/jwtService');

const authenticateToken = async (req: any, res: any, next: any) => {
  const token = req.header('Authorization');
  if (!token) {
    console.error('Token não fornecido.');
    return res.status(401).send('Access denied.');
  }

  try {
    const decoded = jwtService.verifyToken(token);
    
    next();
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    res.status(400).send('Invalid token.');
  }
};

module.exports = { authenticateToken };
