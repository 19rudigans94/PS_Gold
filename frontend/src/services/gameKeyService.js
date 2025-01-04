import api from './api';

// Получить все ключи (для админов)
export const getAllGameKeys = async () => {
  return await api.get('/game-keys/all');
};

// Получить ключи пользователя
export const getUserGameKeys = async () => {
  return await api.get('/game-keys/my');
};

// Добавить новые ключи
export const addGameKeys = async (gameId, keys) => {
  return await api.post('/game-keys/add', { gameId, keys });
};

// Зарезервировать ключ
export const reserveGameKey = async (gameId) => {
  return await api.post('/game-keys/reserve', { gameId });
};

// Подтвердить покупку ключа
export const confirmKeyPurchase = async (keyId) => {
  return await api.post('/game-keys/confirm', { keyId });
};

// Отменить резервацию ключа
export const cancelKeyReservation = async (keyId) => {
  return await api.post('/game-keys/cancel', { keyId });
};

// Повторно получить данные ключа
export const resendKeyData = async (keyId) => {
  return await api.get(`/game-keys/resend/${keyId}`);
};

// Удалить ключ (для админов)
export const deleteGameKey = async (keyId) => {
  return await api.delete(`/game-keys/${keyId}`);
};
