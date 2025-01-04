import { prisma } from '../index.js';

// Функция для создания новой консоли
export const createConsole = async (consoleData) => {
  return await prisma.console.create({
    data: consoleData
  });
};

// Функция для получения всех консолей
export const getAllConsoles = async () => {
  return await prisma.console.findMany({
    include: {
      games: true
    }
  });
};

// Функция для получения консоли по ID
export const getConsoleById = async (id) => {
  return await prisma.console.findUnique({
    where: { id: parseInt(id) },
    include: {
      games: true
    }
  });
};

// Функция для обновления консоли
export const updateConsole = async (consoleId, consoleData) => {
  return await prisma.console.update({
    where: { id: parseInt(consoleId) },
    data: consoleData,
    include: {
      games: true
    }
  });
};

// Функция для удаления консоли
export const deleteConsole = async (consoleId) => {
  return await prisma.console.delete({
    where: { id: parseInt(consoleId) }
  });
};