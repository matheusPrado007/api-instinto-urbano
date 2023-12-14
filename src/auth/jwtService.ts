import jwt from 'jsonwebtoken';

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, 'batata123', { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId }, 'refreshSecret', { expiresIn: '7d' }); // Um tempo mais longo para o refresh token

  return { accessToken, refreshToken };
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, 'batata123');
};

const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, 'refreshSecret');
};

export { generateTokens, verifyAccessToken, verifyRefreshToken };
