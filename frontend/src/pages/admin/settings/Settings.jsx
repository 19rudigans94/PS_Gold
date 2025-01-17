import React from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Email as EmailIcon,
  Payment as PaymentIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { GeneralSettings } from './components/GeneralSettings';
import { SecuritySettings } from './components/SecuritySettings';
import { EmailSettings } from './components/EmailSettings';
import { PaymentSettings } from './components/PaymentSettings';
import { NotificationSettings } from './components/NotificationSettings';
import { useSettings } from './hooks/useSettings';

const Settings = () => {
  const {
    settings,
    loading,
    activeTab,
    isTestingEmail,
    handleSettingChange,
    handleTabChange,
    saveSettings,
    testEmailSettings
  } = useSettings();

  if (loading) {
    return <LoadingSpinner />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralSettings
            settings={settings.general}
            onChange={handleSettingChange}
            onSave={saveSettings}
          />
        );
      case 'security':
        return (
          <SecuritySettings
            settings={settings.security}
            onChange={handleSettingChange}
            onSave={saveSettings}
          />
        );
      case 'email':
        return (
          <EmailSettings
            settings={settings.email}
            onChange={handleSettingChange}
            onSave={saveSettings}
            onTest={testEmailSettings}
            isTestingEmail={isTestingEmail}
          />
        );
      case 'payment':
        return (
          <PaymentSettings
            settings={settings.payment}
            onChange={handleSettingChange}
            onSave={saveSettings}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            settings={settings.notifications}
            onChange={handleSettingChange}
            onSave={saveSettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Настройки
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, value) => handleTabChange(value)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            icon={<SettingsIcon />}
            label="Общие"
            value="general"
          />
          <Tab
            icon={<SecurityIcon />}
            label="Безопасность"
            value="security"
          />
          <Tab
            icon={<EmailIcon />}
            label="Email"
            value="email"
          />
          <Tab
            icon={<PaymentIcon />}
            label="Оплата"
            value="payment"
          />
          <Tab
            icon={<NotificationsIcon />}
            label="Уведомления"
            value="notifications"
          />
        </Tabs>
      </Paper>

      <Paper sx={{ p: 3 }}>
        {renderTabContent()}
      </Paper>
    </Container>
  );
};

export default Settings;
