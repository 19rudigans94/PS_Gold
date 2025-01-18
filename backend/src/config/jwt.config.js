export const jwtConfig = {
  accessToken: {
    expiresIn: '24h',
    algorithm: 'HS256'
  },
  refreshToken: {
    expiresIn: '7d'
  },
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000 // 24 часа
  }
};
