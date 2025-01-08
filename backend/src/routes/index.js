import { Router } from 'express';
import authRoutes from './auth.routes.js';
import gameRoutes from './game.routes.js';
import userRoutes from './user.routes.js';
import orderRoutes from './order.routes.js';
import paymentRoutes from './payment.routes.js';
import settingsRoutes from './settings.routes.js';
import gameKeyRoutes from './gameKey.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import contactRoutes from './contact.routes.js';

const router = Router();
const API_VERSION = '/api';

// Маршруты API
router.use(`${API_VERSION}/auth`, authRoutes);
router.use(`${API_VERSION}/games`, gameRoutes);
router.use(`${API_VERSION}/users`, userRoutes);
router.use(`${API_VERSION}/orders`, orderRoutes);
router.use(`${API_VERSION}/payments`, paymentRoutes);
router.use(`${API_VERSION}/settings`, settingsRoutes);
router.use(`${API_VERSION}/game-keys`, gameKeyRoutes);
router.use(`${API_VERSION}/dashboard`, dashboardRoutes);
router.use(`${API_VERSION}/contact`, contactRoutes);

export default router;