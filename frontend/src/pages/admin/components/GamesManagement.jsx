import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { productsAPI } from '../../../services/api';
import Modal from '../../../components/modals/Modal';
import GameForm from './GameForm';
import { toast } from 'react-toastify';

function GamesManagement() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const data = await productsAPI.getGames();
      setGames(data);
    } catch (error) {
      console.error('Ошибка загрузки игр:', error);
      toast.error('Ошибка при загрузке игр');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    try {
      await productsAPI.deleteGame(itemToDelete.id);
      await fetchGames();
      toast.success('Игра успешно удалена');
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      toast.error('Ошибка при удалении игры');
    } finally {
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await productsAPI.updateGame(editingItem.id, formData);
        toast.success('Игра успешно обновлена');
      } else {
        await productsAPI.createGame(formData);
        toast.success('Игра успешно добавлена');
      }
      await fetchGames();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      toast.error(error.message || 'Ошибка при сохранении игры');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск игр..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={handleAddItem}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Добавить игру
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={game.imageUrl ? `${import.meta.env.VITE_API_URL}/${game.imageUrl}` : '/placeholder-image.png'}
                  alt={game.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.png';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{game.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold">₽{game.price}</span>
                    <span className="text-sm text-gray-500 ml-2">{game.console}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditItem(game)}
                      className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(game)}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Модальное окно для добавления/редактирования */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        title={`${editingItem ? 'Редактировать' : 'Добавить'} игру`}
      >
        <GameForm
          onSubmit={handleSubmit}
          initialData={editingItem}
        />
      </Modal>

      {/* Модальное окно подтверждения удаления */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setItemToDelete(null);
        }}
        title="Подтверждение удаления"
      >
        <div className="p-6">
          <p className="mb-6">
            Вы уверены, что хотите удалить игру "{itemToDelete?.title}"?
          </p>
          <div className="flex justify-end gap-4">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowDeleteConfirm(false);
                setItemToDelete(null);
              }}
            >
              Отмена
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDeleteConfirm}
            >
              Удалить
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default GamesManagement;
