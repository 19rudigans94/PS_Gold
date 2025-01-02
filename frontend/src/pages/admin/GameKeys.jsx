import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
      const [gamesResponse, keysResponse] = await Promise.all([
        axios.get('/api/games'),
        axios.get('/api/game-keys/all')
      ]);
      setGames(gamesResponse.data);
      setGameKeys(keysResponse.data);
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
    const updatedKeys = newKeys.filter((_, i) => i !== index);
    setNewKeys(updatedKeys);
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

      if (newKeys.some(key => !key.login || !key.password)) {
        toast.error('Заполните все поля');
        return;
      }

      await axios.post('/api/game-keys/add', {
        gameId: selectedGame,
        keys: newKeys
      });

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

  const togglePasswordVisibility = (keyId) => {
    setShowPasswords(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Typography>Загрузка...</Typography>
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Управление цифровыми ключами</Typography>
        <Button
          variant="contained"
          startIcon={<Plus className="h-4 w-4" />}
          onClick={() => setOpenDialog(true)}
        >
          Добавить ключи
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Игра</TableCell>
              <TableCell>Логин</TableCell>
              <TableCell>Пароль</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Покупатель</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameKeys.map((key) => (
              <TableRow key={key._id}>
                <TableCell>{key.game.title}</TableCell>
                <TableCell>{key.login}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {showPasswords[key._id] ? key.password : '••••••••'}
                    <IconButton
                      size="small"
                      onClick={() => togglePasswordVisibility(key._id)}
                    >
                      {showPasswords[key._id] ? 
                        <EyeOff className="h-4 w-4" /> : 
                        <Eye className="h-4 w-4" />
                      }
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>
                  {key.is_sold ? (
                    <Alert severity="error" sx={{ py: 0 }}>Продан</Alert>
                  ) : (
                    <Alert severity="success" sx={{ py: 0 }}>Доступен</Alert>
                  )}
                </TableCell>
                <TableCell>
                  {key.buyer ? key.buyer.email : '-'}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => {
                      // Добавить функционал удаления
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Добавить цифровые ключи</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel>Игра</InputLabel>
            <Select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              label="Игра"
            >
              {games.filter(game => game.isDigital).map((game) => (
                <MenuItem key={game._id} value={game._id}>
                  {game.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {newKeys.map((key, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
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
                type="password"
              />
              {index > 0 && (
                <IconButton color="error" onClick={() => handleRemoveKey(index)}>
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              )}
            </Box>
          ))}

          <Button
            startIcon={<Plus className="h-4 w-4" />}
            onClick={handleAddKey}
            sx={{ mt: 1 }}
          >
            Добавить еще ключ
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
          <Button onClick={handleSubmit} variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GameKeys;
