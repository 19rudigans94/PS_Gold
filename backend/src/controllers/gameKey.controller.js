import { PrismaClient } from '@prisma/client';
import { addMinutes } from 'date-fns';

const prisma = new PrismaClient();
const RESERVATION_TIME = 15; // время резервации в минутах

export const getAllGameKeys = async (req, res) => {
  try {
    const keys = await prisma.gameKey.findMany({
      include: {
        game: true,
        buyer: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });
    res.json({ success: true, data: keys });
  } catch (error) {
    console.error('Ошибка при получении ключей:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении ключей' 
    });
  }
};

export const getGameKeysByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const keys = await prisma.gameKey.findMany({
      where: {
        OR: [
          { buyerId: userId },
          { reservedById: userId }
        ]
      },
      include: {
        game: true
      }
    });
    res.json({ success: true, data: keys });
  } catch (error) {
    console.error('Ошибка при получении ключей пользователя:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении ключей' 
    });
  }
};

export const addGameKeys = async (req, res) => {
  try {
    const { gameId, keys } = req.body;

    const game = await prisma.game.findUnique({
      where: { id: parseInt(gameId) }
    });

    if (!game) {
      return res.status(404).json({ 
        success: false, 
        message: 'Игра не найдена' 
      });
    }

    const createdKeys = await prisma.$transaction(
      keys.map(key => prisma.gameKey.create({
        data: {
          gameId: parseInt(gameId),
          password: key.password,
          status: 'available'
        }
      }))
    );

    // Обновляем количество копий игры
    await prisma.game.update({
      where: { id: parseInt(gameId) },
      data: {
        totalCopies: { increment: keys.length },
        availableCopies: { increment: keys.length }
      }
    });

    res.status(201).json({ 
      success: true, 
      data: createdKeys 
    });
  } catch (error) {
    console.error('Ошибка при добавлении ключей:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при добавлении ключей' 
    });
  }
};

export const reserveGameKey = async (req, res) => {
  try {
    const { gameId } = req.body;
    const userId = req.user.id;

    // Проверяем, нет ли уже зарезервированных ключей у пользователя
    const existingReservation = await prisma.gameKey.findFirst({
      where: {
        gameId: parseInt(gameId),
        reservedById: userId,
        status: 'reserved'
      }
    });

    if (existingReservation) {
      return res.status(400).json({ 
        success: false, 
        message: 'У вас уже есть зарезервированный ключ для этой игры' 
      });
    }

    // Находим доступный ключ
    const key = await prisma.gameKey.findFirst({
      where: {
        gameId: parseInt(gameId),
        status: 'available'
      }
    });

    if (!key) {
      return res.status(404).json({ 
        success: false, 
        message: 'Нет доступных ключей' 
      });
    }

    // Резервируем ключ
    const reservedKey = await prisma.gameKey.update({
      where: { id: key.id },
      data: {
        status: 'reserved',
        reservedById: userId,
        reservedAt: new Date(),
        reservationExpires: addMinutes(new Date(), RESERVATION_TIME)
      },
      include: {
        game: true
      }
    });

    // Обновляем количество доступных копий
    await prisma.game.update({
      where: { id: parseInt(gameId) },
      data: {
        availableCopies: { decrement: 1 }
      }
    });

    res.json({ success: true, data: reservedKey });
  } catch (error) {
    console.error('Ошибка при резервации ключа:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при резервации ключа' 
    });
  }
};

export const confirmPurchase = async (req, res) => {
  try {
    const { keyId } = req.body;
    const userId = req.user.id;

    const key = await prisma.gameKey.findFirst({
      where: {
        id: parseInt(keyId),
        reservedById: userId,
        status: 'reserved'
      },
      include: {
        game: true
      }
    });

    if (!key) {
      return res.status(404).json({ 
        success: false, 
        message: 'Ключ не найден или не зарезервирован вами' 
      });
    }

    const updatedKey = await prisma.gameKey.update({
      where: { id: key.id },
      data: {
        status: 'sold',
        buyerId: userId,
        reservedById: null,
        reservedAt: null,
        reservationExpires: null
      }
    });

    res.json({ success: true, data: updatedKey });
  } catch (error) {
    console.error('Ошибка при подтверждении покупки:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при подтверждении покупки' 
    });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const { keyId } = req.body;
    const userId = req.user.id;

    const key = await prisma.gameKey.findFirst({
      where: {
        id: parseInt(keyId),
        reservedById: userId,
        status: 'reserved'
      }
    });

    if (!key) {
      return res.status(404).json({ 
        success: false, 
        message: 'Ключ не найден или не зарезервирован вами' 
      });
    }

    await prisma.gameKey.update({
      where: { id: key.id },
      data: {
        status: 'available',
        reservedById: null,
        reservedAt: null,
        reservationExpires: null
      }
    });

    // Возвращаем копию в доступные
    await prisma.game.update({
      where: { id: key.gameId },
      data: {
        availableCopies: { increment: 1 }
      }
    });

    res.json({ 
      success: true, 
      message: 'Резервация отменена' 
    });
  } catch (error) {
    console.error('Ошибка при отмене резервации:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при отмене резервации' 
    });
  }
};
