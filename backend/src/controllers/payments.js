import { getAllOrders, updateOrderStatus } from '../models/Order.js';

export const initKaspiPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await getAllOrders().then(orders => orders.find(order => order._id.toString() === orderId));

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    // В реальном приложении здесь будет интеграция с API Kaspi
    const paymentData = {
      paymentId: 'KASPI-' + Math.random().toString(36).substr(2, 9),
      paymentUrl: 'https://kaspi.kz/pay/example',
      amount: order.totalPrice,
      currency: 'KZT'
    };

    await updateOrderStatus(orderId, 'pending_payment');

    res.json(paymentData);
  } catch (error) {
    console.error('Ошибка при инициализации платежа:', error);
    res.status(500).json({ message: 'Ошибка при инициализации платежа' });
  }
};

export const checkKaspiPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await getAllOrders().then(orders => orders.find(order => order._id.toString() === orderId));

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    // В реальном приложении здесь будет проверка статуса платежа через API Kaspi
    const paymentStatus = Math.random() > 0.5 ? 'completed' : 'pending';

    if (paymentStatus === 'completed') {
      await updateOrderStatus(orderId, 'paid');
    }

    res.json({ status: paymentStatus });
  } catch (error) {
    console.error('Ошибка при проверке платежа:', error);
    res.status(500).json({ message: 'Ошибка при проверке платежа' });
  }
};

export const cancelKaspiPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await getAllOrders().then(orders => orders.find(order => order._id.toString() === orderId));

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    // В реальном приложении здесь будет отмена платежа через API Kaspi
    await updateOrderStatus(orderId, 'cancelled');

    res.json({ message: 'Платеж отменен' });
  } catch (error) {
    console.error('Ошибка при отмене платежа:', error);
    res.status(500).json({ message: 'Ошибка при отмене платежа' });
  }
};

export const getPaymentStatistics = async (req, res) => {
  try {
    const orders = await getAllOrders();
    
    const totalPayments = orders.filter(order => order.status === 'paid').length;
    const totalRevenue = orders
      .filter(order => order.status === 'paid')
      .reduce((sum, order) => sum + order.totalPrice, 0);
    
    const paymentStatuses = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    
    const averageOrderValue = totalPayments > 0 ? totalRevenue / totalPayments : 0;
    
    res.json({
      totalPayments,
      totalRevenue,
      averageOrderValue,
      paymentStatuses
    });
  } catch (error) {
    console.error('Ошибка при получении статистики платежей:', error);
    res.status(500).json({ message: 'Ошибка при получении статистики платежей' });
  }
};