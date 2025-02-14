import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://ps-gold.kz',
  'https://ps-gold.kz',
  'http://www.ps-gold.kz',
  'https://www.ps-gold.kz',
  'http://185.4.180.115'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Все маршруты API
app.use(routes);

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Что-то пошло не так!' });
});

export default app;