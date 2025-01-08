import { AppError } from '../middleware/error.middleware.js';
import prisma from '../lib/prisma.js';

export const checkEntityExists = async (model, id, entityName) => {
  const entity = await prisma[model].findUnique({
    where: { id: parseInt(id) }
  });

  if (!entity) {
    throw new AppError(`${entityName} не найден`, 404);
  }

  return entity;
};

export const handleFileUpload = async (file, directory) => {
  if (!file) return null;
  return `/uploads/${directory}/${file.filename}`;
};

export const removeFile = async (filePath) => {
  if (!filePath) return;
  try {
    await fs.unlink(path.join(process.cwd(), 'public', filePath));
  } catch (error) {
    console.error(`Ошибка при удалении файла ${filePath}:`, error);
  }
};
