import React from 'react';
import {
  TextField,
  Grid,
  Button,
  Box,
  FormControlLabel,
  Switch
} from '@mui/material';

export const SecuritySettings = ({ settings, onChange, onSave }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Минимальная длина пароля"
            value={settings.passwordMinLength}
            onChange={(e) => onChange('security', 'passwordMinLength', parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Максимальное количество попыток входа"
            value={settings.maxLoginAttempts}
            onChange={(e) => onChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Время блокировки (минуты)"
            value={settings.lockoutDuration}
            onChange={(e) => onChange('security', 'lockoutDuration', parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.requireSpecialChars}
                onChange={(e) => onChange('security', 'requireSpecialChars', e.target.checked)}
              />
            }
            label="Требовать специальные символы"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.requireNumbers}
                onChange={(e) => onChange('security', 'requireNumbers', e.target.checked)}
              />
            }
            label="Требовать цифры"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.requireUppercase}
                onChange={(e) => onChange('security', 'requireUppercase', e.target.checked)}
              />
            }
            label="Требовать заглавные буквы"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSave('security')}
          >
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
