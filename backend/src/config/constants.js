// Пагинация
export const ITEMS_PER_PAGE = 10;

// Загрузка файлов
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const UPLOAD_DIR = 'uploads';

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

// Директории для загрузки
export const UPLOAD_DIRS = {
    GAMES: 'uploads/games',
    AVATARS: 'uploads/avatars',
    TEMP: 'uploads/temp'
  };