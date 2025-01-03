import crypto from 'crypto';

export default {
    encryptionKey: process.env.ENCRYPTION_KEY || crypto.randomBytes(32),
    // Другие настройки конфигурации можно добавить здесь
};
