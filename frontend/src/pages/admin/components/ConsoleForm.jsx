import React, { useState } from 'react';
import { Upload, Image as ImageIcon, X, Plus } from 'lucide-react';

const conditions = ['new', 'excellent', 'good', 'fair'];
const conditionLabels = {
  new: 'Новая',
  excellent: 'Отличное',
  good: 'Хорошее',
  fair: 'Удовлетворительное'
};

function ConsoleForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    pricePerDay: initialData?.pricePerDay || '',
    condition: initialData?.condition || 'new',
    serialNumber: initialData?.serialNumber || '',
    accessories: initialData?.accessories || []
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.imageUrl || '');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    }
  };

  const handleAccessoryAdd = () => {
    setFormData(prev => ({
      ...prev,
      accessories: [...prev.accessories, '']
    }));
  };

  const handleAccessoryChange = (index, value) => {
    const newAccessories = [...formData.accessories];
    newAccessories[index] = value;
    setFormData(prev => ({
      ...prev,
      accessories: newAccessories
    }));
  };

  const handleAccessoryRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      accessories: prev.accessories.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title) {
      newErrors.title = 'Введите название консоли';
    }
    
    if (!formData.pricePerDay || isNaN(formData.pricePerDay) || formData.pricePerDay <= 0) {
      newErrors.pricePerDay = 'Укажите корректную цену за день';
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = 'Описание обязательно';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formDataToSubmit = new FormData();
    
    // Добавляем все поля, даже если они пустые
    formDataToSubmit.append('title', formData.title || '');
    formDataToSubmit.append('description', formData.description || '');
    formDataToSubmit.append('pricePerDay', formData.pricePerDay || '');
    formDataToSubmit.append('condition', formData.condition || 'new');
    formDataToSubmit.append('serialNumber', formData.serialNumber || '');
    
    // Добавляем аксессуары только если они есть
    if (formData.accessories && formData.accessories.length > 0) {
      formDataToSubmit.append('accessories', JSON.stringify(formData.accessories));
    }

    // Добавляем файл изображения, если он был выбран
    if (selectedFile) {
      formDataToSubmit.append('image', selectedFile);
    }

    // Проверяем содержимое FormData перед отправкой
    console.log('Отправляемые данные:');
    for (let pair of formDataToSubmit.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    onSubmit(formDataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Левая колонка */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название консоли
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
              Цена за день
            </label>
            <div className="relative">
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                min="0"
                className={`input w-full pl-8 ${errors.pricePerDay ? 'border-red-500' : ''}`}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₽</span>
            </div>
            {errors.pricePerDay && (
              <p className="text-red-500 text-sm mt-1">{errors.pricePerDay}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Состояние
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="input w-full"
            >
              {conditions.map(condition => (
                <option key={condition} value={condition}>
                  {conditionLabels[condition]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Серийный номер
            </label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              className="input w-full"
            />
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
              Комплектация
            </label>
            <div className="space-y-2">
              {formData.accessories.map((accessory, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={accessory}
                    onChange={(e) => handleAccessoryChange(index, e.target.value)}
                    className="input flex-1"
                    placeholder="Название аксессуара"
                  />
                  <button
                    type="button"
                    onClick={() => handleAccessoryRemove(index)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAccessoryAdd}
                className="btn btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Добавить аксессуар
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Изображение */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Изображение
        </label>
        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
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
        </div>
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="submit"
          className="btn btn-primary"
        >
          {initialData ? 'Сохранить' : 'Добавить'}
        </button>
      </div>
    </form>
  );
}

export default ConsoleForm;
