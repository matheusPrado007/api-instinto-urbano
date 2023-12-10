import jwt from 'jsonwebtoken';

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, 'batata123', { expiresIn: '1h' }); // Troque pelo seu segredo
};

const verifyToken = (token: string) => {
  return jwt.verify(token, 'batata123'); // Troque pelo seu segredo
};

export { generateToken, verifyToken };
