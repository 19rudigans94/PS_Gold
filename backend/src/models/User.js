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

// Функция для получения пользователя по email
export const getUserByEmail = async (email) => {
  try {
    console.log('Поиск пользователя по email:', email);
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
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new Error('Некорректный ID пользователя');
    }
    
    console.log('Поиск пользователя по ID:', userId);
    const user = await prisma.user.findUnique({
      where: { id: userId },
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
    if (typeof userId !== 'number' || isNaN(userId)) {
      throw new Error('Некорректный ID пользователя');
    }

    // Проверяем, что userData не содержит запрещенные поля
    const allowedFields = ['email', 'name', 'role', 'status', 'password'];
    const updateData = {};
    
    Object.keys(userData).forEach(key => {
      if (allowedFields.includes(key)) {
        // Проверяем допустимые значения для role и status
        if (key === 'role' && !['user', 'admin'].includes(userData[key])) {
          throw new Error('Недопустимое значение для роли');
        }
        if (key === 'status' && !['active', 'inactive'].includes(userData[key])) {
          throw new Error('Недопустимое значение для статуса');
        }
        updateData[key] = userData[key];
      }
    });

    console.log('Обновление пользователя:', userId);
    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });
    console.log('Пользователь успешно обновлен');
    return user;
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    throw error;
  }
};

// Функция для удаления пользователя
export const deleteUser = async (userId) => {
  try {
    const id = parseInt(userId);
    if (isNaN(id)) {
      throw new Error('Некорректный ID пользователя');
    }

    console.log('Удаление пользователя:', id);
    await prisma.user.delete({
      where: { id }
    });
    console.log('Пользователь успешно удален');
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    throw error;
  }
};

// Функция для сравнения паролей
export const comparePassword = async (candidatePassword, userPassword) => {
  try {
    return await bcrypt.compare(candidatePassword, userPassword);
  } catch (error) {
    console.error('Ошибка при сравнении паролей:', error);
    throw error;
  }
};