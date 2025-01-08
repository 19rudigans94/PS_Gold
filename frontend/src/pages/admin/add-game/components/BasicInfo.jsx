import React from 'react';
import {
  Grid,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const genres = [
  'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation',
  'Sports', 'Racing', 'Indie', 'Casual', 'MMO'
];

const features = [
  'Single-player', 'Multi-player', 'Co-op', 'Controller Support',
  'Cloud Saves', 'Achievements', 'Trading Cards', 'In-App Purchases'
];

export const BasicInfo = ({ formData, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Название игры"
            value={formData.title}
            onChange={(e) => onChange('title', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="Описание"
            value={formData.description}
            onChange={(e) => onChange('description', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Краткое описание"
            value={formData.shortDescription}
            onChange={(e) => onChange('shortDescription', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            type="number"
            label="Цена"
            value={formData.price}
            onChange={(e) => onChange('price', e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">₽</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Цена со скидкой"
            value={formData.discountPrice}
            onChange={(e) => onChange('discountPrice', e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">₽</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Дата выхода"
            value={formData.releaseDate ? dayjs(formData.releaseDate) : null}
            onChange={(date) => onChange('releaseDate', date ? date.toISOString() : null)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => onChange('status', e.target.value)}
              label="Статус"
            >
              <MenuItem value="draft">Черновик</MenuItem>
              <MenuItem value="published">Опубликовано</MenuItem>
              <MenuItem value="hidden">Скрыто</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Разработчик"
            value={formData.developer}
            onChange={(e) => onChange('developer', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Издатель"
            value={formData.publisher}
            onChange={(e) => onChange('publisher', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={genres}
            value={formData.genres}
            onChange={(_, newValue) => onChange('genres', newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Жанры" />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={features}
            value={formData.features}
            onChange={(_, newValue) => onChange('features', newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Особенности" />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={formData.tags}
            onChange={(_, newValue) => onChange('tags', newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Теги" />
            )}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};
