import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { productsAPI, gameKeysAPI } from '@/services/api';

function GameKeys() {
  const [games, setGames] = useState([]);
  const [gameKeys, setGameKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [newKeys, setNewKeys] = useState([{ login: '', password: '' }]);
  const [showPasswords, setShowPasswords] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [gamesData, keysData] = await Promise.all([
        productsAPI.getGames(),
        gameKeysAPI.getAllKeys()
      ]);
      
      setGames(gamesData || []);
      setGameKeys(keysData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  const handleAddKey = () => {
    setNewKeys([...newKeys, { login: '', password: '' }]);
  };

  const handleRemoveKey = (index) => {
    setNewKeys(newKeys.filter((_, i) => i !== index));
  };

  const handleKeyChange = (index, field, value) => {
    const updatedKeys = newKeys.map((key, i) => {
      if (i === index) {
        return { ...key, [field]: value };
      }
      return key;
    });
    setNewKeys(updatedKeys);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedGame) {
        toast.error('Выберите игру');
        return;
      }

      const invalidKeys = newKeys.some(key => !key.login || !key.password);
      if (invalidKeys) {
        toast.error('Заполните все поля для ключей');
        return;
      }

      await gameKeysAPI.addKeys(selectedGame, newKeys);
      toast.success('Ключи успешно добавлены');
      
      setOpenDialog(false);
      setSelectedGame('');
      setNewKeys([{ login: '', password: '' }]);
      fetchData();
    } catch (error) {
      console.error('Error adding keys:', error);
      toast.error('Ошибка при добавлении ключей');
    }
  };

  const handleDeleteKey = async (keyId) => {
    try {
      await gameKeysAPI.deleteKey(keyId);
      toast.success('Ключ успешно удален');
      fetchData();
    } catch (error) {
      console.error('Error deleting key:', error);
      toast.error('Ошибка при удалении ключа');
    }
  };

  const togglePasswordVisibility = (keyId) => {
    setShowPasswords(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Загрузка...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Управление ключами</Typography>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={() => setOpenDialog(true)}
        >
          Добавить ключи
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Игра</TableCell>
              <TableCell>Логин</TableCell>
              <TableCell>Пароль</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameKeys.map((key) => (
              <TableRow key={key.id}>
                <TableCell>{key.id}</TableCell>
                <TableCell>{games.find(g => g.id === key.gameId)?.title || 'Неизвестная игра'}</TableCell>
                <TableCell>{key.login}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {showPasswords[key.id] ? key.password : '••••••••'}
                    <IconButton
                      size="small"
                      onClick={() => togglePasswordVisibility(key.id)}
                    >
                      {showPasswords[key.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: key.status === 'available' ? 'success.light' : 'warning.light',
                      color: 'white',
                    }}
                  >
                    {key.status === 'available' ? 'Доступен' : 'Зарезервирован'}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteKey(key.id)}
                    disabled={key.status !== 'available'}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Добавить ключи</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Игра</InputLabel>
              <Select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                label="Игра"
              >
                {games.map((game) => (
                  <MenuItem key={game.id} value={game.id}>
                    {game.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {newKeys.map((key, index) => (
              <Box key={index} sx={{ mb: 2, display: 'flex', gap: 1 }}>
                <TextField
                  label="Логин"
                  value={key.login}
                  onChange={(e) => handleKeyChange(index, 'login', e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Пароль"
                  value={key.password}
                  onChange={(e) => handleKeyChange(index, 'password', e.target.value)}
                  fullWidth
                />
                <IconButton
                  color="error"
                  onClick={() => handleRemoveKey(index)}
                  disabled={newKeys.length === 1}
                >
                  <Trash2 size={16} />
                </IconButton>
              </Box>
            ))}

            <Button
              startIcon={<Plus />}
              onClick={handleAddKey}
              sx={{ mt: 1 }}
            >
              Добавить еще ключ
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
          <Button onClick={handleSubmit} variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default GameKeys;
