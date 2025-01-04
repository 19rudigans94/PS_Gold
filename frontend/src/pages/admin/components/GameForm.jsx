import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

const genres = ['Action', 'Adventure', 'RPG', 'Sports', 'Strategy', 'Racing', 'Fighting'];
const ageRatings = ['3+', '7+', '12+', '16+', '18+'];

function GameForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    genre: '',
    releaseYear: '',
    ageRating: '',
    publisher: '',
    isDigital: false,
    totalCopies: '',
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
    if (formData.isDigital && (!formData.totalCopies || formData.totalCopies <= 0)) {
      newErrors.totalCopies = 'Укажите количество цифровых копий';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'imageUrl') {
        data.append(key, formData[key]);
      }
    });
    if (selectedFile) {
      data.append('image', selectedFile);
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Название */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Название
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.title ? 'border-red-500' : ''
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      {/* Описание */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Описание
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.description ? 'border-red-500' : ''
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      {/* Цена */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Цена
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.price ? 'border-red-500' : ''
          }`}
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-500">{errors.price}</p>
        )}
      </div>

      {/* Жанр */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Жанр
        </label>
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.genre ? 'border-red-500' : ''
          }`}
        >
          <option value="">Выберите жанр</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        {errors.genre && (
          <p className="mt-1 text-sm text-red-500">{errors.genre}</p>
        )}
      </div>

      {/* Год выпуска */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Год выпуска
        </label>
        <input
          type="number"
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
          min="1970"
          max={new Date().getFullYear()}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Возрастной рейтинг */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Возрастной рейтинг
        </label>
        <select
          name="ageRating"
          value={formData.ageRating}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.ageRating ? 'border-red-500' : ''
          }`}
        >
          <option value="">Выберите рейтинг</option>
          {ageRatings.map(rating => (
            <option key={rating} value={rating}>{rating}</option>
          ))}
        </select>
        {errors.ageRating && (
          <p className="mt-1 text-sm text-red-500">{errors.ageRating}</p>
        )}
      </div>

      {/* Издатель */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Издатель
        </label>
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.publisher ? 'border-red-500' : ''
          }`}
        />
        {errors.publisher && (
          <p className="mt-1 text-sm text-red-500">{errors.publisher}</p>
        )}
      </div>

      {/* Цифровая версия */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="isDigital"
          checked={formData.isDigital}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Цифровая версия
        </label>
      </div>

      {/* Количество копий (для цифровой версии) */}
      {formData.isDigital && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Количество цифровых копий
          </label>
          <input
            type="number"
            name="totalCopies"
            value={formData.totalCopies}
            onChange={handleChange}
            min="1"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              errors.totalCopies ? 'border-red-500' : ''
            }`}
          />
          {errors.totalCopies && (
            <p className="mt-1 text-sm text-red-500">{errors.totalCopies}</p>
          )}
        </div>
      )}

      {/* Изображение */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Изображение
        </label>
        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          <div className="space-y-1 text-center">
            {previewUrl ? (
              <div className="relative inline-block">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl('');
                  }}
                  className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500">
                    <span>Загрузить файл</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        {errors.image && (
          <p className="mt-1 text-sm text-red-500">{errors.image}</p>
        )}
      </div>

      {/* Кнопки */}
      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialData ? 'Сохранить' : 'Создать'}
        </button>
      </div>
    </form>
  );
}

export default GameForm;
