import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchSettings, updateSettings } from '../../../../store/slices/settingsSlice';
import { settingsAPI } from '../../../../services/settingsAPI';

const defaultSettings = {
  general: {
    siteName: '',
    description: '',
    contactEmail: '',
    phoneNumber: '',
    address: ''
  },
  security: {
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    maxLoginAttempts: 5,
    lockoutDuration: 15
  },
  email: {
    smtpServer: '',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    senderName: '',
    senderEmail: ''
  },
  payment: {
    currency: 'RUB',
    vatRate: 20,
    paymentMethods: ['card', 'qiwi', 'yoomoney'],
    minOrderAmount: 100,
    maxOrderAmount: 50000
  },
  notifications: {
    orderConfirmation: true,
    orderStatusUpdate: true,
    newGameAlert: true,
    priceDropAlert: true,
    newsletterFrequency: 'weekly'
  }
};

export const useSettings = () => {
  const dispatch = useDispatch();
  const { settings, isLoading, error } = useSelector(state => state.settings);
  const [activeTab, setActiveTab] = useState('general');
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [localSettings, setLocalSettings] = useState(defaultSettings);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSettingChange = (section, field, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    try {
      await dispatch(updateSettings(localSettings)).unwrap();
      toast.success('Настройки успешно сохранены');
    } catch (error) {
      toast.error(error || 'Ошибка при сохранении настроек');
    }
  };

  const handleTestEmail = async () => {
    setIsTestingEmail(true);
    try {
      await settingsAPI.testEmailSettings(localSettings.email);
      toast.success('Тестовое письмо отправлено успешно');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Ошибка отправки тестового письма');
    } finally {
      setIsTestingEmail(false);
    }
  };

  return {
    settings: localSettings,
    loading: isLoading,
    error,
    activeTab,
    isTestingEmail,
    handleTabChange,
    handleSettingChange,
    handleSaveSettings,
    handleTestEmail
  };
};
