import express from 'express';
import { initKaspiPayment, checkKaspiPayment, cancelKaspiPayment, getPaymentStatistics } from '../controllers/payments.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/kaspi/init', auth, initKaspiPayment);
router.get('/kaspi/check/:paymentId', auth, checkKaspiPayment);
router.post('/kaspi/cancel/:paymentId', auth, cancelKaspiPayment);
router.get('/statistics', adminAuth, getPaymentStatistics);

export default router;