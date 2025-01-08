import React from 'react';
import {
  TextField,
  Grid,
  Button,
  Box
} from '@mui/material';

export const GeneralSettings = ({ settings, onChange, onSave }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Название сайта"
            value={settings.siteName}
            onChange={(e) => onChange('general', 'siteName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Описание"
            value={settings.description}
            onChange={(e) => onChange('general', 'description', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email для связи"
            type="email"
            value={settings.contactEmail}
            onChange={(e) => onChange('general', 'contactEmail', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Номер телефона"
            value={settings.phoneNumber}
            onChange={(e) => onChange('general', 'phoneNumber', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Адрес"
            value={settings.address}
            onChange={(e) => onChange('general', 'address', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSave('general')}
          >
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
