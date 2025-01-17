import React from 'react';
import {
  TextField,
  Grid,
  Button,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const EmailSettings = ({ settings, onChange, onSave, onTest, isTestingEmail }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="SMTP сервер"
            value={settings.smtpServer}
            onChange={(e) => onChange('email', 'smtpServer', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="SMTP порт"
            value={settings.smtpPort}
            onChange={(e) => onChange('email', 'smtpPort', parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="SMTP пользователь"
            value={settings.smtpUsername}
            onChange={(e) => onChange('email', 'smtpUsername', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="SMTP пароль"
            value={settings.smtpPassword}
            onChange={(e) => onChange('email', 'smtpPassword', e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Имя отправителя"
            value={settings.senderName}
            onChange={(e) => onChange('email', 'senderName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="email"
            label="Email отправителя"
            value={settings.senderEmail}
            onChange={(e) => onChange('email', 'senderEmail', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSave('email')}
            >
              Сохранить
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={onTest}
              disabled={isTestingEmail}
            >
              {isTestingEmail ? 'Отправка...' : 'Тестировать'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
