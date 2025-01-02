import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

const consoleTypes = ['PlayStation 5', 'Xbox Series X', 'Nintendo Switch'];
const genres = ['Action', 'Adventure', 'RPG', 'Sports', 'Strategy', 'Racing', 'Fighting'];
const ageRatings = ['3+', '7+', '12+', '16+', '18+'];

function GameForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    console: '',
    price: '',
    imageUrl: '',
    genre: '',
    releaseYear: '',
    ageRating: '',
    publisher: '',
    isDigital: false,
    ...initialData
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.imageUrl || '');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Размер файла не должен превышать 5MB'
        }));
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          image: 'Поддерживаются только форматы JPG и PNG'
        }));
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Валидация
    if (!formData.title.trim()) {
      newErrors.title = 'Введите название игры';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Введите описание игры';
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Введите корректную цену';
    }
    if (!formData.console) {
      newErrors.console = 'Выберите консоль';
    }
    if (!formData.genre) {
      newErrors.genre = 'Выберите жанр';
    }
    if (!formData.ageRating) {
      newErrors.ageRating = 'Выберите возрастной рейтинг';
    }
    if (!formData.publisher.trim()) {
      newErrors.publisher = 'Введите издателя';
    }
    if (!initialData && !selectedFile) {
      newErrors.image = 'Добавьте изображение';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    if (selectedFile) {
      formDataToSend.append('image', selectedFile);
    }

    onSubmit(formDataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Левая колонка */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название игры
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input w-full ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Консоль
            </label>
            <select
              name="console"
              value={formData.console}
              onChange={handleChange}
              className={`input w-full ${errors.console ? 'border-red-500' : ''}`}
            >
              <option value="">Выберите консоль</option>
              {consoleTypes.map(console => (
                <option key={console} value={console}>
                  {console}
                </option>
              ))}
            </select>
            {errors.console && (
              <p className="text-red-500 text-sm mt-1">{errors.console}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Цена
            </label>
            <div className="relative">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                className={`input w-full pl-8 ${errors.price ? 'border-red-500' : ''}`}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₽</span>
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Жанр
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="">Выберите жанр</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`input w-full ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Возрастной рейтинг
            </label>
            <select
              name="ageRating"
              value={formData.ageRating}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="">Выберите рейтинг</option>
              {ageRatings.map(rating => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Издатель
            </label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Год выпуска
            </label>
            <input
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              min="1990"
              max={new Date().getFullYear()}
              className="input w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isDigital"
          name="isDigital"
          checked={formData.isDigital}
          onChange={(e) => setFormData({ ...formData, isDigital: e.target.checked })}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <label htmlFor="isDigital" className="text-sm font-medium text-gray-700">
          Цифровая версия
        </label>
      </div>

      {formData.isDigital && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                После создания игры не забудьте добавить цифровые ключи в разделе "Цифровые ключи"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Изображение */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Изображение
        </label>
        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          {previewUrl ? (
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-64 rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl('');
                }}
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full transform translate-x-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Загрузить изображение</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
            </>
          )}
          <p className="text-xs text-gray-500">PNG, JPG до 5MB</p>
        </div>
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {initialData ? 'Обновить' : 'Создать'}
      </button>
    </form>
  );
}

export default GameForm;
