import prisma from '../lib/prisma.js';

const defaultSettings = {
  general: {
    siteName: 'GameRent',
    email: 'info@gamerent.ru',
    supportEmail: 'support@gamerent.ru',
    contactEmail: 'support@gamerent.ru',
    phoneNumber: '+7 (999) 123-45-67',
    address: 'г. Москва, ул. Примерная, д. 1',
  },
  delivery: {
    defaultShippingMethod: 'standard',
    enableFreeShipping: false,
    deliveryPrice: 300,
    minOrderAmount: 1000,
    freeDeliveryAmount: 5000,
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    orderStatus: true,
    promotional: false,
  },
  maintenance: {
    maintenanceMode: false,
    maintenanceMessage: '',
  }
};

// Получение настроек
export const getSettings = async (req, res) => {
  try {
    const settings = await prisma.settings.findFirst();
    
    if (!settings) {
      // Если настройки не найдены, возвращаем дефолтные
      return res.json(defaultSettings);
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении настроек',
      error: error.message
    });
  }
};

// Обновление настроек
export const updateSettings = async (req, res) => {
  try {
    const settings = await prisma.settings.upsert({
      where: {
        id: 1 // Предполагаем, что у нас только одна запись настроек
      },
      update: req.body,
      create: {
        ...req.body,
        id: 1
      }
    });
    
    res.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при обновлении настроек',
      error: error.message
    });
  }
};
