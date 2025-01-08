import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Divider
} from '@mui/material';

const RequirementsSection = ({ type, requirements, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {type === 'minimum' ? 'Минимальные' : 'Рекомендуемые'} требования
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Операционная система"
          value={requirements.os}
          onChange={(e) => onChange(type, 'os', e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Процессор"
          value={requirements.processor}
          onChange={(e) => onChange(type, 'processor', e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Оперативная память"
          value={requirements.memory}
          onChange={(e) => onChange(type, 'memory', e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Видеокарта"
          value={requirements.graphics}
          onChange={(e) => onChange(type, 'graphics', e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="DirectX"
          value={requirements.directX}
          onChange={(e) => onChange(type, 'directX', e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Подключение к сети"
          value={requirements.network}
          onChange={(e) => onChange(type, 'network', e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Место на диске"
          value={requirements.storage}
          onChange={(e) => onChange(type, 'storage', e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export const SystemRequirements = ({ formData, onChange }) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <RequirementsSection
          type="minimum"
          requirements={formData.systemRequirements.minimum}
          onChange={onChange}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <RequirementsSection
          type="recommended"
          requirements={formData.systemRequirements.recommended}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};
