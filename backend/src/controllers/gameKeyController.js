import GameKey from '../models/GameKey.js';
import Game from '../models/Game.js';
import { validationResult } from 'express-validator';
import { sendEmail } from '../utils/email';
import { encrypt, decrypt } from '../utils/encryption';

// Получить все ключи (только для админов)
export const getAllKeys = async (req, res) => {
  try {
    const keys = await GameKey.find()
      .populate('game', 'title')
      .populate('buyer', 'email')
      .select('-password');
    
    res.json(keys);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении ключей' });
  }
};

// Получить ключи конкретного пользователя
export const getUserKeys = async (req, res) => {
  try {
    const keys = await GameKey.find({ buyer: req.user._id })
      .populate('game', 'title')
      .select('-password');
    
    res.json(keys);
  } catch (error) {
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

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Игра не найдена' });
    }

    if (!game.isDigital) {
      return res.status(400).json({ message: 'Эта игра не является цифровой версией' });
    }

    const newKeys = await GameKey.insertMany(
      keys.map(key => ({
        game: gameId,
        login: key.login,
        password: encrypt(key.password)
      }))
    );

    // Обновляем количество копий в игре
    game.totalCopies += keys.length;
    game.availableCopies += keys.length;
    await game.save();

    res.status(201).json(newKeys.map(key => ({
      _id: key._id,
      game: key.game,
      login: key.login
    })));
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении ключей' });
  }
};

// Зарезервировать ключ
export const reserveKey = async (req, res) => {
  try {
    const { gameId } = req.body;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Игра не найдена' });
    }

    if (!game.isDigital) {
      return res.status(400).json({ message: 'Эта игра не является цифровой версией' });
    }

    const key = await GameKey.reserveKey(gameId, req.user._id);
    
    res.json({ message: 'Ключ успешно зарезервирован', keyId: key._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Подтвердить покупку ключа
export const confirmKeyPurchase = async (req, res) => {
  try {
    const { keyId } = req.body;

    const key = await GameKey.confirmPurchase(keyId, req.user._id);
    if (!key) {
      return res.status(400).json({ message: 'Ключ не найден или уже продан' });
    }

    // Обновляем количество доступных копий в игре
    const game = await Game.findById(key.game);
    game.availableCopies -= 1;
    await game.save();

    // Отправляем данные покупателю
    const decryptedPassword = decrypt(key.password);
    await sendEmail({
      to: req.user.email,
      subject: 'Ваши данные для доступа к игре',
      text: `
        Спасибо за покупку!
        
        Ваши данные для доступа:
        Логин: ${key.login}
        Пароль: ${decryptedPassword}
        
        Сохраните эти данные в надежном месте.
      `
    });

    res.json({
      message: 'Покупка успешно подтверждена',
      key: {
        _id: key._id,
        game: key.game,
        login: key.login,
        password: decryptedPassword
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Отменить резервацию ключа
export const cancelKeyReservation = async (req, res) => {
  try {
    const { keyId } = req.body;

    const key = await GameKey.cancelReservation(keyId);
    if (!key) {
      return res.status(404).json({ message: 'Ключ не найден' });
    }

    res.json({ message: 'Резервация отменена' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Повторно отправить данные ключа
export const resendKeyData = async (req, res) => {
  try {
    const key = await GameKey.findOne({
      _id: req.params.keyId,
      buyer: req.user._id
    }).populate('game', 'title');

    if (!key) {
      return res.status(404).json({ message: 'Ключ не найден' });
    }

    const decryptedPassword = decrypt(key.password);
    await sendEmail({
      to: req.user.email,
      subject: 'Повторная отправка данных для доступа к игре',
      text: `
        Ваши данные для доступа:
        Логин: ${key.login}
        Пароль: ${decryptedPassword}
        
        Сохраните эти данные в надежном месте.
      `
    });

    res.json({
      game: key.game.title,
      login: key.login,
      password: decryptedPassword
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении данных ключа' });
  }
};

// Удалить ключ (только для админов)
export const deleteKey = async (req, res) => {
  try {
    const key = await GameKey.findById(req.params.keyId);
    
    if (!key) {
      return res.status(404).json({ message: 'Ключ не найден' });
    }

    if (key.is_sold) {
      return res.status(400).json({ message: 'Нельзя удалить проданный ключ' });
    }

    // Обновляем количество копий в игре
    const game = await Game.findById(key.game);
    game.totalCopies -= 1;
    game.availableCopies -= 1;
    await game.save();

    await key.remove();
    
    res.json({ message: 'Ключ успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении ключа' });
  }
};

export const addGameKeys = async (req, res) => {
    try {
        const { gameId, keys } = req.body;
        
        // Проверяем существование игры
        const game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).json({ message: 'Игра не найдена' });
        }

        // Шифруем и сохраняем ключи
        const savedKeys = await Promise.all(keys.map(async key => {
            const encryptedPassword = await encrypt(key.password);
            return new GameKey({
                game: gameId,
                login: key.login,
                password: encryptedPassword
            }).save();
        }));

        // Обновляем количество копий в игре
        game.totalCopies += keys.length;
        await game.save();

        res.status(201).json({
            message: 'Ключи успешно добавлены',
            count: savedKeys.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const reserveGameKey = async (req, res) => {
    try {
        const { gameId } = req.body;
        const userId = req.user.id;

        // Проверяем наличие свободных ключей
        const key = await GameKey.reserveKey(gameId, userId);
        if (!key) {
            return res.status(400).json({ message: 'Нет доступных ключей' });
        }

        res.json({
            message: 'Ключ зарезервирован',
            keyId: key._id,
            expiresAt: key.reserved_until
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const confirmPurchase = async (req, res) => {
    try {
        const { keyId, orderId } = req.body;
        const userId = req.user.id;

        // Подтверждаем покупку ключа
        const key = await GameKey.confirmPurchase(keyId, userId);
        if (!key) {
            return res.status(400).json({ message: 'Ключ не найден или уже продан' });
        }

        // Расшифровываем пароль для отправки пользователю
        const decryptedPassword = await decrypt(key.password);

        // Отправляем данные на почту пользователю
        await sendEmail({
            to: req.user.email,
            subject: 'Ваши данные для доступа к игре',
            text: `
                Спасибо за покупку!
                
                Ваши данные для доступа:
                Логин: ${key.login}
                Пароль: ${decryptedPassword}
                
                Номер заказа: ${orderId}
                
                Сохраните эти данные в надежном месте.
            `
        });

        res.json({
            message: 'Покупка подтверждена',
            login: key.login,
            password: decryptedPassword
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserGameKeys = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const keys = await GameKey.find({ buyer: userId })
            .populate('game', 'title imageUrl')
            .select('-password');

        res.json(keys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const resendGameKey = async (req, res) => {
    try {
        const { keyId } = req.params;
        const userId = req.user.id;

        const key = await GameKey.findOne({
            _id: keyId,
            buyer: userId
        });

        if (!key) {
            return res.status(404).json({ message: 'Ключ не найден' });
        }

        const decryptedPassword = await decrypt(key.password);

        // Повторно отправляем данные на почту
        await sendEmail({
            to: req.user.email,
            subject: 'Повторная отправка данных для доступа к игре',
            text: `
                Ваши данные для доступа:
                Логин: ${key.login}
                Пароль: ${decryptedPassword}
                
                Сохраните эти данные в надежном месте.
            `
        });

        res.json({ message: 'Данные успешно отправлены на вашу почту' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
