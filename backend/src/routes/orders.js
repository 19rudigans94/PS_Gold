import express from 'express';
import { body } from 'express-validator';
import { getOrders, getOrder, createOrderController, updateOrderController, deleteOrderController, getOrderStatistics } from '../controllers/orders.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', adminAuth, getOrders);
router.get('/statistics', adminAuth, getOrderStatistics);
router.get('/:id', auth, getOrder);
router.post('/', auth, [
  body('items').isArray().notEmpty().withMessage('Добавьте товары в заказ'),
  body('items.*.type').isIn(['game', 'console']).withMessage('Неверный тип товара'),
  body('items.*.item').notEmpty().withMessage('ID товара обязателен'),
  body('totalPrice').isNumeric().withMessage('Укажите общую сумму заказа')
], createOrderController);
router.put('/:id', adminAuth, updateOrderController);
router.delete('/:id', adminAuth, deleteOrderController);

export default router;