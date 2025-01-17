import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e) => {
    console.log('Query: ' + e.query);
    console.log('Duration: ' + e.duration + 'ms');
  });
}

export default prisma;