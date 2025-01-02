import Settings from '../models/Settings.js';

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        general: {
          siteName: 'GameRent',
          supportEmail: 'support@gamerent.ru',
          phoneNumber: '+7 (999) 123-45-67',
          address: 'г. Москва, ул. Примерная, д. 1'
        },
        delivery: {
          minOrderAmount: 1000,
          freeDeliveryAmount: 5000,
          deliveryPrice: 300,
          maxDeliveryDistance: 30
        },
        notifications: {
          emailNotifications: true,
          smsNotifications: true,
          orderStatusUpdates: true,
          marketingEmails: false
        },
        maintenance: {
          maintenanceMode: false,
          maintenanceMessage: 'Сайт находится на техническом обслуживании. Пожалуйста, попробуйте позже.'
        }
      });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении настроек' });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении настроек' });
  }
};