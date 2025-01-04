import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Проверяем, существует ли уже администратор
    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: 'admin@gamerent.ru'
      }
    });

    if (!existingAdmin) {
      // Создаем администратора
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = await prisma.user.create({
        data: {
          email: 'admin@gamerent.ru',
          password: hashedPassword,
          name: 'Administrator',
          role: 'admin'
        }
      });
      console.log('Создан администратор:', admin);
    } else {
      console.log('Администратор уже существует');
    }
  } catch (error) {
    console.error('Ошибка при создании администратора:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
