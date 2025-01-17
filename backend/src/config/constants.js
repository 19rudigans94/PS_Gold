// Пагинация
export const ITEMS_PER_PAGE = 10;

// Токены
export const ACCESS_TOKEN_EXPIRES = '15m';
export const REFRESH_TOKEN_EXPIRES = '7d';

// Роли пользователей
export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

// Статусы заказов
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

// Статусы платежей
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};