import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { productsAPI } from '../../../services/api';
import Modal from '../../../components/modals/Modal';
import ConsoleForm from './ConsoleForm';
import { toast } from 'react-toastify';

function ConsolesManagement() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [consoles, setConsoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchConsoles = async () => {
    setIsLoading(true);
    try {
      const data = await productsAPI.getConsoles();
      setConsoles(data);
    } catch (error) {
      console.error('Ошибка загрузки консолей:', error);
      toast.error('Ошибка при загрузке консолей');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsoles();
  }, []);

  const filteredConsoles = consoles.filter(console =>
    console.title.toLowerCase().includes(search.toLowerCase()) ||
    console.description.toLowerCase().includes(search.toLowerCase())
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
      await productsAPI.deleteConsole(itemToDelete._id);
      await fetchConsoles();
      toast.success('Консоль успешно удалена');
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      toast.error('Ошибка при удалении консоли');
    } finally {
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await productsAPI.updateConsole(editingItem._id, formData);
        toast.success('Консоль успешно обновлена');
      } else {
        await productsAPI.createConsole(formData);
        toast.success('Консоль успешно добавлена');
      }
      await fetchConsoles();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      toast.error(error.message || 'Ошибка при сохранении консоли');
    }
  };

  const getConditionLabel = (condition) => {
    const labels = {
      new: 'Новая',
      excellent: 'Отличное',
      good: 'Хорошее',
      fair: 'Удовлетворительное'
    };
    return labels[condition] || condition;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск консолей..."
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
          Добавить консоль
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConsoles.map((console) => (
            <div
              key={console._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={console.imageUrl 
                    ? `${import.meta.env.VITE_API_URL.replace('/api', '')}/api/uploads/${console.imageUrl}` 
                    : '/placeholder-image.png'
                  }
                  alt={console.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    console.error('Ошибка загрузки изображения:', e.target.src);
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.png';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{console.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{console.description}</p>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">₽{console.pricePerDay}/день</span>
                    <span className="text-sm text-gray-500">{getConditionLabel(console.condition)}</span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditItem(console)}
                      className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(console)}
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
        title={`${editingItem ? 'Редактировать' : 'Добавить'} консоль`}
      >
        <ConsoleForm
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
            Вы уверены, что хотите удалить консоль "{itemToDelete?.title}"?
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

export default ConsolesManagement;
