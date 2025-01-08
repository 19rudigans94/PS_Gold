import React from 'react';
import {
  TextField,
  Grid,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput
} from '@mui/material';

const PAYMENT_METHODS = [
  { value: 'card', label: 'Банковская карта' },
  { value: 'qiwi', label: 'QIWI' },
  { value: 'yoomoney', label: 'ЮMoney' }
];

export const PaymentSettings = ({ settings, onChange, onSave }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Валюта</InputLabel>
            <Select
              value={settings.currency}
              onChange={(e) => onChange('payment', 'currency', e.target.value)}
              label="Валюта"
            >
              <MenuItem value="RUB">Рубль (₽)</MenuItem>
              <MenuItem value="USD">Доллар ($)</MenuItem>
              <MenuItem value="EUR">Евро (€)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="НДС (%)"
            value={settings.vatRate}
            onChange={(e) => onChange('payment', 'vatRate', parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Способы оплаты</InputLabel>
            <Select
              multiple
              value={settings.paymentMethods}
              onChange={(e) => onChange('payment', 'paymentMethods', e.target.value)}
              input={<OutlinedInput label="Способы оплаты" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={PAYMENT_METHODS.find(m => m.value === value)?.label}
                    />
                  ))}
                </Box>
              )}
            >
              {PAYMENT_METHODS.map((method) => (
                <MenuItem key={method.value} value={method.value}>
                  {method.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Минимальная сумма заказа"
            value={settings.minOrderAmount}
            onChange={(e) => onChange('payment', 'minOrderAmount', parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Максимальная сумма заказа"
            value={settings.maxOrderAmount}
            onChange={(e) => onChange('payment', 'maxOrderAmount', parseInt(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSave('payment')}
          >
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
