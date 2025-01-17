import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { protect } from '../middleware/auth.middleware.js';
import prisma from '../lib/prisma.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Поиск пользователя
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Неверный email или пароль'
      });
    }

    // Создание JWT токена
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Отправка токена в куки
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000 // 24 часа
    });

    console.log('Login successful:', {
      userId: user.id,
      role: user.role,
      tokenSet: true
    });

    // Отправка данных пользователя
    const userData = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    res.json({
      success: true,
      data: {
        user: userData
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при входе в систему'
    });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });
  
  console.log('Logout successful: cookie cleared');
  
  res.json({
    success: true,
    message: 'Успешный выход из системы'
  });
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  try {
    console.log('Checking auth status for user:', req.user.id);
    
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      console.log('User not found:', req.user.id);
      return res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }

    console.log('Auth check successful for user:', user.id);

    res.json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении данных пользователя'
    });
  }
});

export default router;
