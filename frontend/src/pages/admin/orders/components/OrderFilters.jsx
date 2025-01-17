import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ru } from 'date-fns/locale';

export const OrderFilters = ({
  searchTerm,
  selectedStatus,
  dateRange,
  onSearch,
  onStatusChange,
  onDateRangeChange
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Поиск"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Поиск по ID, email..."
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel>Статус</InputLabel>
            <Select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              label="Статус"
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="pending">В обработке</MenuItem>
              <MenuItem value="completed">Завершен</MenuItem>
              <MenuItem value="cancelled">Отменен</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <DatePicker
              label="Начальная дата"
              value={dateRange.start ? new Date(dateRange.start) : null}
              onChange={(date) => onDateRangeChange({
                ...dateRange,
                start: date ? date.toISOString() : ''
              })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <DatePicker
              label="Конечная дата"
              value={dateRange.end ? new Date(dateRange.end) : null}
              onChange={(date) => onDateRangeChange({
                ...dateRange,
                end: date ? date.toISOString() : ''
              })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );
};
