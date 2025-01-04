import { validationResult } from 'express-validator';
import { createOrder, getAllOrders, updateOrderStatus, deleteOrder } from '../models/Order.js';
import { getAllGames } from '../models/Game.js';
import { getAllConsoles } from '../models/Console.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении заказов' });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await getAllOrders().then(orders => orders.find(order => order._id.toString() === req.params.id));
    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении заказа' });
  }
};

export const createOrderController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items } = req.body;

    // Проверяем наличие всех товаров
    for (const item of items) {
      if (item.type === 'game') {
        const game = await getAllGames().then(games => games.find(game => game._id.toString() === item.item));
        if (!game) {
          return res.status(404).json({ message: `Игра с ID ${item.item} не найдена` });
        }
      } else if (item.type === 'console') {
        const console = await getAllConsoles().then(consoles => consoles.find(console => console._id.toString() === item.item));
        if (!console) {
          return res.status(404).json({ message: `Консоль с ID ${item.item} не найдена` });
        }
      }
    }

    const orderData = {
      user: req.user._id,
      items: items,
      totalPrice: req.body.totalPrice,
      status: 'pending'
    };

    const order = await createOrder(orderData);
    res.status(201).json(order);
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
    res.status(500).json({ message: 'Ошибка при создании заказа' });
  }
};

export const updateOrderController = async (req, res) => {
  try {
    const order = await getAllOrders().then(orders => orders.find(order => order._id.toString() === req.params.id));
    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    const updatedOrder = await updateOrderStatus(req.params.id, req.body.status);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении заказа' });
  }
};

export const deleteOrderController = async (req, res) => {
  try {
    const order = await getAllOrders().then(orders => orders.find(order => order._id.toString() === req.params.id));
    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    await deleteOrder(req.params.id);
    res.json({ message: 'Заказ успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении заказа' });
  }
};

export const getOrderStatistics = async (req, res) => {
  try {
    const orders = await getAllOrders();
    
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    
    const itemTypes = orders.reduce((acc, order) => {
      order.items.forEach(item => {
        acc[item.type] = (acc[item.type] || 0) + 1;
      });
      return acc;
    }, {});
    
    res.json({
      totalOrders,
      totalRevenue,
      averageOrderValue,
      statusCounts,
      itemTypes
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении статистики заказов' });
  }
};