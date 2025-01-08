import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const games = [
  {
    title: 'Cyberpunk 2077',
    description: 'Cyberpunk 2077 — приключенческая ролевая игра с открытым миром, рассказывающая о киберпанке-наёмнике Ви и борьбе за жизнь в мегаполисе Найт-Сити.',
    price: 1999,
    genre: 'rpg',
    publisher: 'CD Projekt RED',
    releaseYear: 2020,
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    inStock: true,
    ageRating: '18+',
    isDigital: true,
    totalCopies: 100,
    availableCopies: 100
  },
  {
    title: 'Red Dead Redemption 2',
    description: 'Америка, 1899 год. Артур Морган и другие подручные Датча ван дер Линде вынуждены пуститься в бега. Их банде предстоит участвовать в кражах, грабежах и перестрелках в самом сердце Америки.',
    price: 2499,
    genre: 'action',
    publisher: 'Rockstar Games',
    releaseYear: 2019,
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
    inStock: true,
    ageRating: '18+',
    isDigital: true,
    totalCopies: 100,
    availableCopies: 100
  },
  {
    title: 'FIFA 24',
    description: 'EA SPORTS FC 24 знаменует начало новой эры в истории The Worlds Game: более 19 000 лицензированных игроков, более 700 команд и более 30 лиг в самой реалистичной футбольной игре.',
    price: 3499,
    genre: 'sports',
    publisher: 'Electronic Arts',
    releaseYear: 2023,
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg',
    inStock: true,
    ageRating: '3+',
    isDigital: true,
    totalCopies: 100,
    availableCopies: 100
  },
  {
    title: 'Forza Horizon 5',
    description: 'Вас ждёт бесконечный калейдоскоп приключений Horizon! Совершайте увлекательные поездки по невероятно красивому и самобытному миру Мексики за рулём величайших автомобилей в истории.',
    price: 2999,
    genre: 'racing',
    publisher: 'Xbox Game Studios',
    releaseYear: 2021,
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg',
    inStock: true,
    ageRating: '6+',
    isDigital: true,
    totalCopies: 100,
    availableCopies: 100
  },
  {
    title: 'Civilization VI',
    description: 'Civilization VI — это игра, в которой вам предстоит построить империю, способную пройти испытание временем. Исследуйте новые земли, развивайте технологии и культуру, создавайте новые чудеса света.',
    price: 1499,
    genre: 'strategy',
    publisher: '2K Games',
    releaseYear: 2016,
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg',
    inStock: true,
    ageRating: '12+',
    isDigital: true,
    totalCopies: 100,
    availableCopies: 100
  }
];

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

    // Добавляем игры
    for (const game of games) {
      const existingGame = await prisma.game.findFirst({
        where: {
          title: game.title
        }
      });

      if (!existingGame) {
        await prisma.game.create({
          data: game
        });
        console.log(`Добавлена игра: ${game.title}`);
      } else {
        console.log(`Игра "${game.title}" уже существует`);
      }
    }

  } catch (error) {
    console.error('Ошибка при заполнении базы данных:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
