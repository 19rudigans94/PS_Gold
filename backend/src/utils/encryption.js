import crypto from 'crypto';
import config from '../config/index.js';

const algorithm = 'aes-256-cbc';
const secretKey = config.encryptionKey || crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export const encrypt = async (text) => {
  try {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  } catch (error) {
    console.error('Ошибка шифрования:', error);
    throw new Error('Ошибка шифрования данных');
  }
};

export const decrypt = async (text) => {
  try {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.error('Ошибка дешифрования:', error);
    throw new Error('Ошибка дешифрования данных');
  }
};
