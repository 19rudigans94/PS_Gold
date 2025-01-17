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

export const UserFilters = ({
  searchTerm,
  selectedRole,
  onSearch,
  onRoleChange
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Поиск"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Поиск по имени, email..."
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Роль</InputLabel>
            <Select
              value={selectedRole}
              onChange={(e) => onRoleChange(e.target.value)}
              label="Роль"
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="user">Пользователь</MenuItem>
              <MenuItem value="admin">Администратор</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
