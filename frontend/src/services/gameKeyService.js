import axios from 'axios';

// Получить все ключи (для админов)
export const getAllGameKeys = async () => {
  const response = await axios.get('/api/game-keys/all');
  return response.data;
};

// Получить ключи пользователя
export const getUserGameKeys = async () => {
  const response = await axios.get('/api/game-keys/my');
  return response.data;
};

// Добавить новые ключи
export const addGameKeys = async (gameId, keys) => {
  const response = await axios.post('/api/game-keys/add', { gameId, keys });
  return response.data;
};

// Зарезервировать ключ
export const reserveGameKey = async (gameId) => {
  const response = await axios.post('/api/game-keys/reserve', { gameId });
  return response.data;
};

// Подтвердить покупку ключа
export const confirmKeyPurchase = async (keyId) => {
  const response = await axios.post('/api/game-keys/confirm', { keyId });
  return response.data;
};

// Отменить резервацию ключа
export const cancelKeyReservation = async (keyId) => {
  const response = await axios.post('/api/game-keys/cancel', { keyId });
  return response.data;
};

// Повторно получить данные ключа
export const resendKeyData = async (keyId) => {
  const response = await axios.get(`/api/game-keys/resend/${keyId}`);
  return response.data;
};

// Удалить ключ (для админов)
export const deleteGameKey = async (keyId) => {
  const response = await axios.delete(`/api/game-keys/${keyId}`);
  return response.data;
};
