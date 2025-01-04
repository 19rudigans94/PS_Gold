import { createSettings, getSettings as getSettingsFromDB, updateSettings as updateSettingsInDB } from '../models/Settings.js';

const defaultSettings = {
  'general.siteName': 'GameRent',
  'general.email': 'info@gamerent.ru',
  'general.supportEmail': 'support@gamerent.ru',
  'general.contactEmail': 'support@gamerent.ru',
  'general.phoneNumber': '+7 (999) 123-45-67',
  'general.address': 'г. Москва, ул. Примерная, д. 1',
  
  'delivery.defaultShippingMethod': 'standard',
  'delivery.enableFreeShipping': 'false',
  'delivery.deliveryPrice': '300',
  'delivery.minOrderAmount': '1000',
  'delivery.freeDeliveryAmount': '5000',
  
  'notifications.emailNotifications': 'true',
  'notifications.smsNotifications': 'false',
  'notifications.orderStatus': 'true',
  'notifications.promotional': 'false',
  
  'maintenance.maintenanceMode': 'false',
  'maintenance.maintenanceMessage': 'Сайт находится на техническом обслуживании. Пожалуйста, попробуйте позже.',
  
  'social.vkontakte': 'https://vk.com/gamerent',
  'social.telegram': 'https://t.me/gamerent',
  'social.whatsapp': '+7 (999) 123-45-67',
};

export const getSettings = async (req, res) => {
  try {
    let settings = await getSettingsFromDB();
    
    if (!settings || settings.length === 0) {
      // Создаем настройки по умолчанию
      const settingsPromises = Object.entries(defaultSettings).map(([key, value]) => {
        return createSettings({
          key,
          value: String(value),
          description: `Setting for ${key}`
        });
      });
      
      settings = await Promise.all(settingsPromises);
    }

    // Преобразуем массив настроек в объект
    const settingsObject = settings.reduce((acc, setting) => {
      const [section, name] = setting.key.split('.');
      if (!acc[section]) {
        acc[section] = {};
      }
      // Преобразуем строковые значения в соответствующие типы
      let value = setting.value;
      if (value === 'true' || value === 'false') {
        value = value === 'true';
      } else if (!isNaN(value) && value.trim() !== '' && !value.includes('@') && !value.includes('+')) {
        value = Number(value);
      }
      acc[section][name] = value;
      return acc;
    }, {});

    res.json(settingsObject);
  } catch (error) {
    console.error('Ошибка при получении настроек:', error);
    res.status(500).json({ message: 'Ошибка при получении настроек' });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const settings = await getSettingsFromDB();
    if (!settings || settings.length === 0) {
      return res.status(404).json({ message: 'Настройки не найдены' });
    }

    const updates = Object.entries(req.body).flatMap(([section, values]) =>
      Object.entries(values).map(([name, value]) => {
        const key = `${section}.${name}`;
        const setting = settings.find(s => s.key === key);
        if (setting) {
          return updateSettingsInDB(setting.id, {
            value: String(value)
          });
        }
        return null;
      }).filter(Boolean)
    );

    await Promise.all(updates);
    
    const updatedSettings = await getSettingsFromDB();
    const settingsObject = updatedSettings.reduce((acc, setting) => {
      const [section, name] = setting.key.split('.');
      if (!acc[section]) {
        acc[section] = {};
      }
      // Преобразуем строковые значения в соответствующие типы
      let value = setting.value;
      if (value === 'true' || value === 'false') {
        value = value === 'true';
      } else if (!isNaN(value) && value.trim() !== '' && !value.includes('@') && !value.includes('+')) {
        value = Number(value);
      }
      acc[section][name] = value;
      return acc;
    }, {});

    res.json(settingsObject);
  } catch (error) {
    console.error('Ошибка при обновлении настроек:', error);
    res.status(500).json({ message: 'Ошибка при обновлении настроек' });
  }
};