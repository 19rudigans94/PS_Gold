import prisma from '../lib/prisma.js';
// Функция для создания настроек
export const createSettings = async (settingsData) => {
  return await prisma.settings.create({
    data: settingsData
  });
};

// Функция для получения настроек
export const getSettings = async () => {
  return await prisma.settings.findMany();
};

// Функция для обновления настроек
export const updateSettings = async (settingsId, settingsData) => {
  return await prisma.settings.update({
    where: { id: settingsId },
    data: settingsData
  });
};

// Функция для удаления настроек
export const deleteSettings = async (settingsId) => {
  return await prisma.settings.delete({
    where: { id: settingsId }
  });
};