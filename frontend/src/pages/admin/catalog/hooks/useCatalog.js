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
    console.log('Fetching games...');
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/games');
      console.log('Response:', response.data);
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
    console.log('Changing page to:', newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    console.log('Changing rows per page to:', newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleOpenDialog = (game = null) => {
    console.log('Opening dialog for game:', game);
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
    console.log('Closing dialog');
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
    console.log(`Changing input ${name} to:`, value);
    setFormData(prev => ({
      ...prev,
      [name]: value

    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Submitting form with data:', formData);
    console.log('Form Data before submission:', formData);
    console.log('Values of all form fields before submission:');
    Object.keys(formData).forEach(key => {
      console.log(`${key}: ${formData[key]}`);
    });
    console.log('Client-side logging: Checking data to be sent to server...');
    console.log('Data to be sent:', formData);
  
    // Преобразование `price` в число
    const parsedPrice = parseFloat(formData.price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      const errorMessage = 'Цена должна быть положительным числом';
      setError(errorMessage);
      toast.error(errorMessage);
      console.log('Error:', errorMessage);
      return;
    }
  
    try {
      setLoading(true);
      setError(null);
  
      const formDataToSend = {
        ...formData,
        price: parseFloat(formData.price), // Преобразование в число
      };
  
      console.log('FormData to send:', formDataToSend);
      console.log('Submitting form with data:', formDataToSend);
      console.log('Form Data before submission:', formData);
      console.log('Client-side logging: Checking data to be sent to server...');
      console.log('Values of all form fields before submission:');
      Object.keys(formDataToSend).forEach(key => {
        console.log(`${key}: ${formDataToSend[key]}`);
      });
      console.log('Data to be sent:', formDataToSend);
  
      if (selectedGame) {
        await api.put(`/games/${selectedGame.id}`, formDataToSend);
        toast.success('Игра успешно обновлена');
        fetchGames(); // Повторная загрузка данных игр после обновления
      } else {
        await api.post('/games', formDataToSend);
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
        console.log('Deleting game with ID:', id);
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