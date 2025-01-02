import Order from '../models/Order.js';

export const initKaspiPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    // В реальном приложении здесь будет интеграция с API Kaspi
    const paymentData = {
      paymentId: 'KASPI-' + Math.random().toString(36).substr(2, 9),
      paymentUrl: 'https://kaspi.kz/pay/example',
      amount: order.total,
      currency: 'KZT'
    };

    order.paymentDetails = {
      kaspiPaymentId: paymentData.paymentId,
      paymentUrl: paymentData.paymentUrl
    };
    await order.save();

    res.json(paymentData);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при инициализации платежа' });
  }
};

export const checkKaspiPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const order = await Order.findOne({ 'paymentDetails.kaspiPaymentId': paymentId });

    if (!order) {
      return res.status(404).json({ message: 'Платеж не найден' });
    }

    // В реальном приложении здесь будет проверка статуса в API Kaspi
    const statuses = ['pending', 'processing', 'completed'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    res.json({
      status: randomStatus,
      orderId: order._id,
      amount: order.total
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при проверке платежа' });
  }
};

export const cancelKaspiPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const order = await Order.findOne({ 'paymentDetails.kaspiPaymentId': paymentId });

    if (!order) {
      return res.status(404).json({ message: 'Платеж не найден' });
    }

    order.paymentStatus = 'cancelled';
    await order.save();

    res.json({ message: 'Платеж отменен' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при отмене платежа' });
  }
};

export const getPaymentStatistics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const orders = await Order.find(query);

    const statistics = {
      total: orders.reduce((sum, order) => sum + order.total, 0),
      byMethod: {
        cash: {
          count: orders.filter(order => order.paymentMethod === 'cash').length,
          amount: orders
            .filter(order => order.paymentMethod === 'cash')
            .reduce((sum, order) => sum + order.total, 0)
        },
        kaspi: {
          count: orders.filter(order => order.paymentMethod === 'kaspi').length,
          amount: orders
            .filter(order => order.paymentMethod === 'kaspi')
            .reduce((sum, order) => sum + order.total, 0)
        }
      }
    };

    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении статистики' });
  }
};