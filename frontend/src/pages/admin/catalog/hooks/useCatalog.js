import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../../services/api';

export const useCatalog = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    genre: '',
    platform: '',
    publisher: '',
    imageUrl: '',
    status: 'active'
  });

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/games');
      if (response.data.success) {
        setGames(response.data.data || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch games');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Ошибка при загрузке игр';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching games:', error);
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (game = null) => {
    if (game) {
      setFormData({
        title: game.title || '',
        description: game.description || '',
        price: game.price?.toString() || '',
        genre: game.genre || '',
        platform: game.platform || '',
        publisher: game.publisher || '',
        imageUrl: game.imageUrl || '',
        status: game.status || 'active'
      });
      setSelectedGame(game);
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        genre: '',
        platform: '',
        publisher: '',
        imageUrl: '',
        status: 'active'
      });
      setSelectedGame(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedGame(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      genre: '',
      platform: '',
      publisher: '',
      imageUrl: '',
      status: 'active'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      const formDataToSend = new FormData();
      
      // Добавляем все поля из formData в FormData
      Object.keys(formData).forEach(key => {
        // Пропускаем пустые значения
        if (formData[key] !== '') {
          // Для числовых полей преобразуем в строку
          if (key === 'price') {
            formDataToSend.append(key, parseFloat(formData[key]).toString());
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      if (selectedGame) {
        await api.put(`/games/${selectedGame.id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Игра успешно обновлена');
      } else {
        await api.post('/games', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Игра успешно создана');
      }

      handleCloseDialog();
      fetchGames();
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.[0]?.msg 
        || error.response?.data?.message 
        || error.message 
        || 'Ошибка при сохранении игры';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error saving game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту игру?')) {
      try {
        await api.delete(`/games/${id}`);
        toast.success('Игра успешно удалена');
        fetchGames();
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Ошибка при удалении игры';
        toast.error(errorMessage);
        console.error('Error deleting game:', error);
      }
    }
  };

  return {
    games,
    loading,
    error,
    openDialog,
    selectedGame,
    formData,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenDialog,
    handleCloseDialog,
    handleInputChange,
    handleSubmit,
    handleDelete
  };
};
