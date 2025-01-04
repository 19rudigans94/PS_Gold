import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usersAPI } from '../services/api';
import { User, Mail, Phone, MapPin, Calendar, Package2, Camera, Save, Upload, X } from 'lucide-react';
import Modal from '../components/modals/Modal';
import { toast } from 'react-toastify';
import UserGameKeys from '../components/UserGameKeys';
import { updateUser } from '../store/slices/authSlice';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    avatar: user?.avatar || ''
  });

  // Обновляем formData при изменении пользователя
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast.error('Размер файла не должен превышать 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        toast.error('Поддерживаются только форматы JPG и PNG');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) {
      toast.error('Пожалуйста, выберите файл');
      return;
    }
    
    if (!user?.id) {
      toast.error('Пользователь не найден');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('avatar', selectedFile);

      const response = await usersAPI.uploadAvatar(user.id, formData);
      
      if (response && response.avatar) {
        const updatedUser = {
          ...user,
          avatar: response.avatar
        };
        
        // Обновляем состояние в Redux
        dispatch(updateUser(updatedUser));
        
        // Обновляем локальное состояние
        setFormData(prev => ({
          ...prev,
          avatar: response.avatar
        }));
        
        toast.success(response.message || 'Фото профиля успешно обновлено');
        setShowPhotoModal(false);
        setSelectedFile(null);
        setPreviewUrl(null);
      } else {
        throw new Error('Не удалось получить URL загруженного аватара');
      }
    } catch (error) {
      console.error('Ошибка загрузки аватара:', error);
      const errorMessage = error.message || error.error || 'Ошибка при загрузке аватара';
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user?.id) {
        toast.error('Пользователь не найден');
        return;
      }

      await usersAPI.updateUser(user.id, formData);
      dispatch(updateUser({ ...user, ...formData }));
      setIsEditing(false);
      toast.success('Профиль успешно обновлен!');
    } catch (error) {
      toast.error('Ошибка при обновлении профиля: ' + (error.response?.data?.message || error.message));
    }
  };

  // Создаем константу для дефолтного аватара
  const defaultAvatarSvg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI5OCIgZmlsbD0iI2YwZjBmMCIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4NSIgcj0iMzUiIGZpbGw9IiNkZGQiLz48cGF0aCBkPSJNMTAwIDE0MGMxOSAwIDM1LTggNDUtMjAgMC0yMi0yMC00MC00NS00MHMtNDUgMTgtNDUgNDBjMTAgMTIgMjYgMjAgNDUgMjB6IiBmaWxsPSIjZGRkIi8+PC9zdmc+';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <img
                src={formData.avatar 
                  ? `${import.meta.env.VITE_API_URL}/uploads/avatars/${formData.avatar}`
                  : defaultAvatarSvg
                }
                onError={(e) => {
                  console.error('Ошибка загрузки изображения:', {
                    attemptedUrl: e.target.src,
                    avatarPath: formData.avatar,
                    apiUrl: import.meta.env.VITE_API_URL,
                    formData: formData,
                    user: user
                  });
                  e.target.src = defaultAvatarSvg;
                }}
                alt={`Профиль ${formData.name || 'пользователя'}`}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <button
                onClick={() => setShowPhotoModal(true)}
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                title="Изменить фото"
              >
                <Camera className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          {/* Профиль пользователя */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold">{formData.name}</h2>
                <p className="text-gray-600">{formData.email}</p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{formData.name}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{formData.email}</span>
                </div>
                {formData.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{formData.phone}</span>
                  </div>
                )}
                {formData.address && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{formData.address}</span>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full btn btn-primary"
                >
                  {isEditing ? 'Отменить' : 'Редактировать профиль'}
                </button>
              </div>
            </div>
          </div>

          {/* Форма редактирования */}
          <div className="lg:col-span-2">
            {isEditing ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Редактировать профиль</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Имя
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Адрес
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn btn-secondary"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Сохранить
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">История заказов</h3>
                <p className="text-gray-600">История заказов пока пуста</p>
              </div>
            )}
          </div>
        </div>
        <section>
          <UserGameKeys />
        </section>
      </div>

      {/* Модальное окно для загрузки фото */}
      <Modal
        isOpen={showPhotoModal}
        onClose={() => {
          setShowPhotoModal(false);
          setSelectedFile(null);
          setPreviewUrl(null);
        }}
        title="Загрузка фото профиля"
      >
        <div className="p-4">
          <div className="mb-4">
            {previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded"
                />
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Нажмите для выбора файла или перетащите его сюда
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG до 5MB
                </p>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="photo-upload"
          />

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowPhotoModal(false);
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
              className="btn btn-secondary"
            >
              Отмена
            </button>
            <label
              htmlFor="photo-upload"
              className={`btn ${previewUrl ? 'btn-secondary' : 'btn-primary'}`}
            >
              Выбрать файл
            </label>
            {previewUrl && (
              <button
                onClick={handlePhotoUpload}
                className="btn btn-primary"
              >
                Загрузить
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Profile;