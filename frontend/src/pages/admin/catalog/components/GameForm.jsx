import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

export const GameForm = ({
  open,
  onClose,
  formData,
  onInputChange,
  onSubmit,
  selectedGame
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {selectedGame ? 'Редактировать игру' : 'Добавить новую игру'}
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Название"
            name="title"
            value={formData.title}
            onChange={onInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Описание"
            name="description"
            value={formData.description}
            onChange={onInputChange}
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Цена"
            name="price"
            type="number"
            value={formData.price}
            onChange={onInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Жанр"
            name="genre"
            value={formData.genre}
            onChange={onInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Платформа"
            name="platform"
            value={formData.platform}
            onChange={onInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Издатель"
            name="publisher"
            value={formData.publisher}
            onChange={onInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="URL изображения"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={onInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Статус</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={onInputChange}
              label="Статус"
            >
              <MenuItem value="active">Активна</MenuItem>
              <MenuItem value="inactive">Неактивна</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained" color="primary">
            {selectedGame ? 'Сохранить' : 'Добавить'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
