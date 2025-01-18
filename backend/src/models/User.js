import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';

// Функция для создания нового пользователя
export const createUser = async (userData) => {
  try {
    console.log('Создание нового пользователя:', userData.email);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: { ...userData, password: hashedPassword },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    console.log('Пользователь успешно создан:', user.id);
    return user;
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    throw error;
  }
};

// Функция для получения всех пользователей
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

// Функция для получения пользователя по email для аутентификации
export const getUserByEmail = async (email) => {
  try {
    console.log('Поиск пользователя по email:', email);
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
        createdAt: true,
        updatedAt: true
      }
    });
    console.log('Результат поиска:', user ? 'Пользователь найден' : 'Пользователь не найден');
    return user;
  } catch (error) {
    console.error('Ошибка при поиске пользователя:', error);
    throw error;
  }
};

// Функция для получения пользователя по email с полными данными
export const getUserByEmailWithDetails = async (email) => {
  try {
    console.log('Поиск пользователя по email с деталями:', email);
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        orders: {
          include: {
            games: {
              include: {
                game: true
              }
            },
            payment: true
          }
        },
        boughtKeys: {
          include: {
            game: true
          }
        },
        reservedKeys: {
          include: {
            game: true
          }
        }
      }
    });
    console.log('Результат поиска:', user ? 'Пользователь найден' : 'Пользователь не найден');
    return user;
  } catch (error) {
    console.error('Ошибка при поиске пользователя:', error);
    throw error;
  }
};

// Функция для получения пользователя по ID с заказами
export const getUserById = async (id) => {
  try {
    console.log('Поиск пользователя по ID:', id);
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        orders: {
          include: {
            games: {
              include: {
                game: true
              }
            },
            payment: true
          }
        },
        boughtKeys: {
          include: {
            game: true
          }
        },
        reservedKeys: {
          include: {
            game: true
          }
        }
      }
    });
    console.log('Результат поиска:', user ? 'Пользователь найден' : 'Пользователь не найден');
    return user;
  } catch (error) {
    console.error('Ошибка при поиске пользователя:', error);
    throw error;
  }
};

// Функция для обновления пользователя
export const updateUser = async (userId, userData) => {
  try {
    console.log('Обновление пользователя:', userId);
    
    // Если передан пароль, хешируем его
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    console.log('Пользователь успешно обновлен:', userId);
    return user;
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    throw error;
  }
};

// Функция для удаления пользователя
export const deleteUser = async (userId) => {
  try {
    console.log('Удаление пользователя:', userId);
    await prisma.user.delete({
      where: { id: userId }
    });
    console.log('Пользователь успешно удален:', userId);
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    throw error;
  }
};

// Функция для сравнения паролей
export const comparePassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};