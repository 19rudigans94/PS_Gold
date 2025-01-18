import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config.js';

export const generateAccessToken = (user) => {
  return jwt.sign(
    { 
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    jwtConfig.accessToken
  );
};

export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    jwtConfig.refreshToken
  );
};

export const verifyToken = async (token, secret = process.env.JWT_SECRET) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const validateTokenPayload = (payload) => {
  const requiredFields = ['id', 'email', 'role'];
  return requiredFields.every(field => payload.hasOwnProperty(field));
};
