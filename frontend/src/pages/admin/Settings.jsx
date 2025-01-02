import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Loader, Settings as SettingsIcon, Truck, Bell, Wrench } from 'lucide-react';
import { toast } from 'react-toastify';
import { settingsAPI } from '../../services/api';

const initialSettings = {
  general: {
    siteName: '',
    supportEmail: '',
    phoneNumber: '',
    address: ''
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
};

const tabs = [
  { id: 'general', name: 'Общие', icon: SettingsIcon },
  { id: 'delivery', name: 'Доставка', icon: Truck },
  { id: 'notifications', name: 'Уведомления', icon: Bell },
  { id: 'maintenance', name: 'Обслуживание', icon: Wrench }
];

function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const data = await settingsAPI.getSettings();
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Ошибка при загрузке настроек:', error);
      toast.error('Ошибка при загрузке настроек');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateSettings(settings);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Пожалуйста, исправьте ошибки перед сохранением');
      return;
    }

    if (!window.confirm('Вы уверены, что хотите сохранить изменения?')) {
      return;
    }

    setIsLoading(true);
    try {
      await settingsAPI.updateSettings(settings);
      toast.success('Настройки успешно сохранены');
      setIsDirty(false);
    } catch (error) {
      toast.error(error?.message || 'Ошибка при сохранении настроек');
      console.error('Ошибка при сохранении настроек:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    if (isDirty && !window.confirm('Вы уверены? Все несохраненные изменения будут потеряны.')) {
      return;
    }
    await fetchSettings();
    setIsDirty(false);
    setErrors({});
    toast.info('Настройки сброшены к последней сохраненной версии');
  };

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setIsDirty(true);
    // Очищаем ошибку поля при его изменении
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateSettings = (settings) => {
    const errors = {};

    // Валидация общих настроек
    if (!settings.general.siteName?.trim()) {
      errors.siteName = 'Название сайта обязательно';
    }
    if (!settings.general.supportEmail?.trim()) {
      errors.supportEmail = 'Email поддержки обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.general.supportEmail)) {
      errors.supportEmail = 'Некорректный формат email';
    }
    if (!settings.general.phoneNumber?.trim()) {
      errors.phoneNumber = 'Телефон обязателен';
    } else if (!/^\+7\d{10}$/.test(settings.general.phoneNumber)) {
      errors.phoneNumber = 'Формат телефона: +7XXXXXXXXXX';
    }

    // Валидация настроек доставки
    if (settings.delivery.minOrderAmount < 0) {
      errors.minOrderAmount = 'Сумма не может быть отрицательной';
    }
    if (settings.delivery.freeDeliveryAmount < settings.delivery.minOrderAmount) {
      errors.freeDeliveryAmount = 'Сумма бесплатной доставки должна быть больше минимальной суммы заказа';
    }
    if (settings.delivery.deliveryPrice < 0) {
      errors.deliveryPrice = 'Стоимость доставки не может быть отрицательной';
    }
    if (settings.delivery.maxDeliveryDistance < 1) {
      errors.maxDeliveryDistance = 'Минимальное расстояние доставки - 1 км';
    }

    return errors;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название сайта
              </label>
              <input
                type="text"
                value={settings.general.siteName}
                onChange={(e) => handleChange('general', 'siteName', e.target.value)}
                className={`input w-full ${errors.siteName ? 'border-red-500' : ''}`}
                placeholder="Введите название сайта"
              />
              {errors.siteName && (
                <p className="text-red-500 text-sm mt-1">{errors.siteName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email поддержки
              </label>
              <input
                type="email"
                value={settings.general.supportEmail}
                onChange={(e) => handleChange('general', 'supportEmail', e.target.value)}
                className={`input w-full ${errors.supportEmail ? 'border-red-500' : ''}`}
                placeholder="support@example.com"
              />
              {errors.supportEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.supportEmail}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Телефон
              </label>
              <input
                type="text"
                value={settings.general.phoneNumber}
                onChange={(e) => handleChange('general', 'phoneNumber', e.target.value)}
                className={`input w-full ${errors.phoneNumber ? 'border-red-500' : ''}`}
                placeholder="+7XXXXXXXXXX"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Адрес
              </label>
              <input
                type="text"
                value={settings.general.address}
                onChange={(e) => handleChange('general', 'address', e.target.value)}
                className="input w-full"
                placeholder="Введите адрес"
              />
            </div>
          </div>
        );
      case 'delivery':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Минимальная сумма заказа (₽)
              </label>
              <input
                type="number"
                value={settings.delivery.minOrderAmount}
                onChange={(e) => handleChange('delivery', 'minOrderAmount', parseInt(e.target.value))}
                className={`input w-full ${errors.minOrderAmount ? 'border-red-500' : ''}`}
                min="0"
              />
              {errors.minOrderAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.minOrderAmount}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Сумма для бесплатной доставки (₽)
              </label>
              <input
                type="number"
                value={settings.delivery.freeDeliveryAmount}
                onChange={(e) => handleChange('delivery', 'freeDeliveryAmount', parseInt(e.target.value))}
                className={`input w-full ${errors.freeDeliveryAmount ? 'border-red-500' : ''}`}
                min="0"
              />
              {errors.freeDeliveryAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.freeDeliveryAmount}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Стоимость доставки (₽)
              </label>
              <input
                type="number"
                value={settings.delivery.deliveryPrice}
                onChange={(e) => handleChange('delivery', 'deliveryPrice', parseInt(e.target.value))}
                className={`input w-full ${errors.deliveryPrice ? 'border-red-500' : ''}`}
                min="0"
              />
              {errors.deliveryPrice && (
                <p className="text-red-500 text-sm mt-1">{errors.deliveryPrice}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Максимальное расстояние доставки (км)
              </label>
              <input
                type="number"
                value={settings.delivery.maxDeliveryDistance}
                onChange={(e) => handleChange('delivery', 'maxDeliveryDistance', parseInt(e.target.value))}
                className={`input w-full ${errors.maxDeliveryDistance ? 'border-red-500' : ''}`}
                min="1"
              />
              {errors.maxDeliveryDistance && (
                <p className="text-red-500 text-sm mt-1">{errors.maxDeliveryDistance}</p>
              )}
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Email уведомления</h3>
                <p className="text-sm text-gray-500">Получать уведомления на email</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="emailNotifications"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">SMS уведомления</h3>
                <p className="text-sm text-gray-500">Получать уведомления по SMS</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="smsNotifications"
                  checked={settings.notifications.smsNotifications}
                  onChange={(e) => handleChange('notifications', 'smsNotifications', e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="smsNotifications"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Обновления статуса заказа</h3>
                <p className="text-sm text-gray-500">Получать уведомления об изменении статуса заказа</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="orderStatusUpdates"
                  checked={settings.notifications.orderStatusUpdates}
                  onChange={(e) => handleChange('notifications', 'orderStatusUpdates', e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="orderStatusUpdates"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Маркетинговые рассылки</h3>
                <p className="text-sm text-gray-500">Получать новости и специальные предложения</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="marketingEmails"
                  checked={settings.notifications.marketingEmails}
                  onChange={(e) => handleChange('notifications', 'marketingEmails', e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="marketingEmails"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
          </div>
        );
      case 'maintenance':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Режим обслуживания</h3>
                <p className="text-sm text-gray-500">Включить режим технического обслуживания сайта</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={settings.maintenance.maintenanceMode}
                  onChange={(e) => handleChange('maintenance', 'maintenanceMode', e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="maintenanceMode"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Сообщение о техническом обслуживании
              </label>
              <textarea
                value={settings.maintenance.maintenanceMessage}
                onChange={(e) => handleChange('maintenance', 'maintenanceMessage', e.target.value)}
                rows="4"
                className="input w-full"
                placeholder="Введите сообщение, которое будет показано пользователям"
              />
              <p className="mt-2 text-sm text-gray-500">
                Это сообщение будет отображаться всем посетителям сайта при включенном режиме обслуживания
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Настройки системы</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary flex items-center"
            disabled={isLoading}
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Сбросить
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary flex items-center"
            disabled={isLoading || !isDirty}
          >
            {isLoading ? (
              <Loader className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <Save className="h-5 w-5 mr-2" />
            )}
            Сохранить изменения
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`
                  flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm
                  ${activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                {name}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderTabContent()}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;