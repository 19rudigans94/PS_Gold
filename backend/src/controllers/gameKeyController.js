import { validationResult } from 'express-validator';
import { sendEmail } from '../utils/email.js';
import { encrypt, decrypt } from '../utils/encryption.js';
import { addGameKey, getAllGameKeys, reserveKey, confirmPurchase, cancelReservation, clearExpiredReservations, getGameKeysByUser } from '../models/GameKey.js';
import { getAllGames } from '../models/Game.js';

// Получить все ключи (только для админов)
export const getAllKeys = async (req, res) => {
  try {
    const keys = await getAllGameKeys();
    res.json(keys);
  } catch (error) {
    console.error('Ошибка при получении ключей:', error);
    res.status(500).json({ message: 'Ошибка при получении ключей' });
  }
};

// Получить ключи конкретного пользователя
export const getUserKeys = async (req, res) => {
  try {
    const keys = await getGameKeysByUser(req.user.id);
    res.json(keys);
  } catch (error) {
    console.error('Ошибка при получении ключей пользователя:', error);
    res.status(500).json({ message: 'Ошибка при получении ключей' });
  }
};

// Добавить новые ключи (только для админов)
export const addKeys = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { gameId, keys } = req.body;

    const game = await getAllGames().then(games => games.find(game => game.id === gameId));
    if (!game) {
      return res.status(404).json({ message: 'Игра не найдена' });
    }

    if (!game.isDigital) {
      return res.status(400).json({ message: 'Эта игра не является цифровой версией' });
    }

    const newKeys = await Promise.all(keys.map(async key => {
      const encryptedPassword = await encrypt(key.password);
      return addGameKey({
        gameId,
        password: encryptedPassword,
        status: 'available'
      });
    }));

    res.status(201).json(newKeys);
  } catch (error) {
    console.error('Ошибка при добавлении ключей:', error);
    res.status(500).json({ message: 'Ошибка при добавлении ключей' });
  }
};

// Зарезервировать ключ
export const reserveGameKey = async (req, res) => {
  try {
    const { gameId } = req.body;
    const key = await reserveKey(gameId, req.user.id);
    if (!key) {
      return res.status(404).json({ message: 'Нет доступных ключей для данной игры' });
    }
    res.json(key);
  } catch (error) {
    console.error('Ошибка при резервации ключа:', error);
    res.status(500).json({ message: 'Ошибка при резервации ключа' });
  }
};

// Подтвердить покупку ключа
export const confirmKeyPurchase = async (req, res) => {
  try {
    const { keyId } = req.params;
    const key = await confirmPurchase(keyId, req.user.id);
    if (!key) {
      return res.status(404).json({ message: 'Ключ не найден или уже продан' });
    }

    const decryptedPassword = await decrypt(key.password);
    
    // Отправляем письмо с ключом
    await sendEmail({
      to: req.user.email,
      subject: 'Ваш ключ активации',
      text: `Спасибо за покупку! Ваш ключ активации: ${decryptedPassword}`
    });

    res.json({ message: 'Ключ успешно приобретен и отправлен на ваш email' });
  } catch (error) {
    console.error('Ошибка при подтверждении покупки:', error);
    res.status(500).json({ message: 'Ошибка при подтверждении покупки' });
  }
};

// Отменить резервацию ключа
export const cancelKeyReservation = async (req, res) => {
  try {
    const { keyId } = req.params;
    await cancelReservation(keyId);
    res.json({ message: 'Резервация отменена' });
  } catch (error) {
    console.error('Ошибка при отмене резервации:', error);
    res.status(500).json({ message: 'Ошибка при отмене резервации' });
  }
};

// Повторно отправить данные ключа
export const resendKeyData = async (req, res) => {
  try {
    const { keyId } = req.params;
    const key = await getAllGameKeys().then(keys => 
      keys.find(key => key.id === parseInt(keyId) && key.buyerId === req.user.id)
    );
    
    if (!key) {
      return res.status(404).json({ message: 'Ключ не найден или не принадлежит вам' });
    }

    const decryptedPassword = await decrypt(key.password);
    
    await sendEmail({
      to: req.user.email,
      subject: 'Повторная отправка ключа активации',
      text: `По вашему запросу высылаем ключ активации: ${decryptedPassword}`
    });

    res.json({ message: 'Ключ повторно отправлен на ваш email' });
  } catch (error) {
    console.error('Ошибка при повторной отправке ключа:', error);
    res.status(500).json({ message: 'Ошибка при повторной отправке ключа' });
  }
};
