import { validationResult } from 'express-validator';
import Order from '../models/Order.js';
import Game from '../models/Game.js';
import Console from '../models/Console.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.item');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении заказов' });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.item');

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении заказа' });
  }
};

export const createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, delivery, paymentMethod } = req.body;

    // Проверка наличия товаров и расчет общей суммы
    let total = 0;
    const validatedItems = await Promise.all(items.map(async (item) => {
      let product;
      if (item.type === 'game') {
        product = await Game.findById(item.id);
      } else {
        product = await Console.findById(item.id);
      }

      if (!product || !product.inStock) {
        throw new Error(`Товар ${item.id} недоступен`);
      }

      const price = item.type === 'game' ? product.price : product.pricePerDay * item.rentalDays;
      total += price * item.quantity;

      return {
        type: item.type,
        item: product._id,
        quantity: item.quantity,
        price,
        rentalDays: item.rentalDays
      };
    }));

    const order = new Order({
      user: req.user._id,
      items: validatedItems,
      total,
      delivery,
      paymentMethod
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении заказа' });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }
    res.json({ message: 'Заказ успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении заказа' });
  }
};

export const getOrderStatistics = async (req, res) => {
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
      count: orders.length,
      byPaymentMethod: {
        cash: orders.filter(order => order.paymentMethod === 'cash').length,
        kaspi: orders.filter(order => order.paymentMethod === 'kaspi').length
      },
      byStatus: {
        pending: orders.filter(order => order.status === 'pending').length,
        processing: orders.filter(order => order.status === 'processing').length,
        completed: orders.filter(order => order.status === 'completed').length,
        cancelled: orders.filter(order => order.status === 'cancelled').length
      }
    };

    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении статистики' });
  }
};