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
import api, { productsAPI } from '@/services/api';
import { getAllGameKeys, addGameKeys, deleteGameKey } from '@/services/gameKeyService';

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
      const [gamesData, keysData] = await Promise.all([
        productsAPI.getGames(),
        getAllGameKeys()
      ]);
      setGames(gamesData);
      setGameKeys(keysData);
    } catch (error) {
      toast.error('Ошибка при загрузке данных');
      console.error(error);
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
    const updatedKeys = [...newKeys];
    updatedKeys[index][field] = value;
    setNewKeys(updatedKeys);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedGame) {
        toast.error('Выберите игру');
        return;
      }

      await addGameKeys(selectedGame, newKeys);
      toast.success('Ключи успешно добавлены');
      setOpenDialog(false);
      setSelectedGame('');
      setNewKeys([{ login: '', password: '' }]);
      fetchData();
    } catch (error) {
      toast.error('Ошибка при добавлении ключей');
      console.error(error);
    }
  };

  const handleDeleteKey = async (keyId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот ключ?')) {
      return;
    }

    try {
      await deleteGameKey(keyId);
      toast.success('Ключ успешно удален');
      fetchData();
    } catch (error) {
      toast.error('Ошибка при удалении ключа');
      console.error(error);
    }
  };

  const togglePasswordVisibility = (keyId) => {
    setShowPasswords(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1">
          Цифровые ключи
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Plus />}
          onClick={() => setOpenDialog(true)}
        >
          Добавить ключи
        </Button>
      </div>

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
                  <div className="flex items-center">
                    <span className="font-mono">
                      {showPasswords[key.id] ? key.password : '••••••••'}
                    </span>
                    <IconButton
                      size="small"
                      onClick={() => togglePasswordVisibility(key.id)}
                    >
                      {showPasswords[key.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    key.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : key.status === 'reserved'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {key.status === 'available'
                      ? 'Доступен'
                      : key.status === 'reserved'
                      ? 'Зарезервирован'
                      : 'Продан'}
                  </span>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDeleteKey(key.id)}
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
        <DialogTitle>Добавить цифровые ключи</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Игра</InputLabel>
              <Select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                label="Игра"
              >
                {games
                  .filter(game => game.isDigital)
                  .map((game) => (
                    <MenuItem key={game.id} value={game.id}>
                      {game.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {newKeys.map((key, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Ключ {index + 1}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
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
                  {index > 0 && (
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveKey(index)}
                    >
                      <Trash2 size={20} />
                    </IconButton>
                  )}
                </Box>
              </Box>
            ))}

            <Button
              startIcon={<Plus />}
              onClick={handleAddKey}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            >
              Добавить еще ключ
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GameKeys;
