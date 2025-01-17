import React from 'react';
import { 
  Box, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Slider,
  Typography,
  Grid
} from '@mui/material';

function GamesFilter({ filters, onFilterChange }) {
  const handleChange = (field) => (event) => {
    onFilterChange({
      ...filters,
      [field]: event.target.value
    });
  };

  const handlePriceChange = (event, newValue) => {
    onFilterChange({
      ...filters,
      priceRange: newValue
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Поиск игр"
            value={filters.search}
            onChange={handleChange('search')}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Платформа</InputLabel>
            <Select
              value={filters.platform}
              label="Платформа"
              onChange={handleChange('platform')}
            >
              <MenuItem value="">Все</MenuItem>
              <MenuItem value="PC">PC</MenuItem>
              <MenuItem value="PS5">PlayStation 5</MenuItem>
              <MenuItem value="PS4">PlayStation 4</MenuItem>
              <MenuItem value="XBOX">Xbox Series X|S</MenuItem>
              <MenuItem value="SWITCH">Nintendo Switch</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Сортировка</InputLabel>
            <Select
              value={filters.sortBy}
              label="Сортировка"
              onChange={handleChange('sortBy')}
            >
              <MenuItem value="popular">По популярности</MenuItem>
              <MenuItem value="price_asc">По возрастанию цены</MenuItem>
              <MenuItem value="price_desc">По убыванию цены</MenuItem>
              <MenuItem value="rating">По рейтингу</MenuItem>
              <MenuItem value="new">По новизне</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            Цена (₽)
          </Typography>
          <Slider
            value={filters.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            step={100}
          />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              {filters.priceRange[0]} ₽
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filters.priceRange[1]} ₽
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GamesFilter;
