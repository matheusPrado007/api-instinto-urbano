// auth/jwtService.js
const jwt = require('jsonwebtoken');

const generateToken = (userId: any) => {
  return jwt.sign({ userId }, 'batata123', { expiresIn: '1h' }); // Troque pelo seu segredo
};

const verifyToken = (token: any) => {
  return jwt.verify(token, 'batata123'); // Troque pelo seu segredo
};

module.exports = { generateToken, verifyToken };
