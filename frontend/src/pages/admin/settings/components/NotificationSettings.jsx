import React from 'react';
import {
  Grid,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch
} from '@mui/material';

export const NotificationSettings = ({ settings, onChange, onSave }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.orderConfirmation}
                onChange={(e) => onChange('notifications', 'orderConfirmation', e.target.checked)}
              />
            }
            label="Подтверждение заказа"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.orderStatusUpdate}
                onChange={(e) => onChange('notifications', 'orderStatusUpdate', e.target.checked)}
              />
            }
            label="Обновление статуса заказа"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.newGameAlert}
                onChange={(e) => onChange('notifications', 'newGameAlert', e.target.checked)}
              />
            }
            label="Уведомления о новых играх"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.priceDropAlert}
                onChange={(e) => onChange('notifications', 'priceDropAlert', e.target.checked)}
              />
            }
            label="Уведомления о снижении цен"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Частота рассылки</InputLabel>
            <Select
              value={settings.newsletterFrequency}
              onChange={(e) => onChange('notifications', 'newsletterFrequency', e.target.value)}
              label="Частота рассылки"
            >
              <MenuItem value="daily">Ежедневно</MenuItem>
              <MenuItem value="weekly">Еженедельно</MenuItem>
              <MenuItem value="monthly">Ежемесячно</MenuItem>
              <MenuItem value="never">Никогда</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSave('notifications')}
          >
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
