import express from 'express';
import { body } from 'express-validator';
import { getOrders, getOrder, createOrder, updateOrder, deleteOrder, getOrderStatistics } from '../controllers/orders.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', adminAuth, getOrders);
router.get('/statistics', adminAuth, getOrderStatistics);
router.get('/:id', auth, getOrder);
router.post('/', auth, [
  body('items').isArray().notEmpty().withMessage('Добавьте товары в заказ'),
  body('delivery').notEmpty().withMessage('Укажите данные доставки'),
  body('paymentMethod').isIn(['cash', 'kaspi']).withMessage('Выберите способ оплаты')
], createOrder);
router.put('/:id', adminAuth, updateOrder);
router.delete('/:id', adminAuth, deleteOrder);

export default router;