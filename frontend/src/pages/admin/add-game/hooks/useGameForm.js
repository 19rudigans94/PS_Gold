import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../../services/api';

export const useGameForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    price: '',
    discountPrice: '',
    releaseDate: null,
    developer: '',
    publisher: '',
    genres: [],
    features: [],
    tags: [],
    systemRequirements: {
      minimum: {
        os: '',
        processor: '',
        memory: '',
        graphics: '',
        directX: '',
        network: '',
        storage: ''
      },
      recommended: {
        os: '',
        processor: '',
        memory: '',
        graphics: '',
        directX: '',
        network: '',
        storage: ''
      }
    },
    languages: [],
    status: 'draft'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSystemRequirementsChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      systemRequirements: {
        ...prev.systemRequirements,
        [type]: {
          ...prev.systemRequirements[type],
          [field]: value
        }
      }
    }));
  };

  const handleImageUpload = async (files) => {
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('images', file);
      });

      const response = await api.post('/upload/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setImages(prev => [...prev, ...response.data.urls]);
    } catch (error) {
      toast.error('Ошибка при загрузке изображений');
      console.error('Error uploading images:', error);
    }
  };

  const handleImageRemove = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = (step) => {
    switch (step) {
      case 0: // Основная информация
        return !!(formData.title && formData.description && formData.price);
      case 1: // Системные требования
        return !!(
          formData.systemRequirements.minimum.os &&
          formData.systemRequirements.minimum.processor &&
          formData.systemRequirements.minimum.memory
        );
      case 2: // Медиа
        return images.length > 0;
      default:
        return true;
    }
  };

  const handleSubmit = async (status = 'draft') => {
    try {
      setLoading(true);
      const gameData = {
        ...formData,
        status,
        images
      };

      await api.post('/games', gameData);
      toast.success('Игра успешно добавлена');
      navigate('/admin/catalog');
    } catch (error) {
      toast.error('Ошибка при добавлении игры');
      console.error('Error adding game:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    activeStep,
    images,
    handleChange,
    handleSystemRequirementsChange,
    handleImageUpload,
    handleImageRemove,
    handleNext,
    handleBack,
    validateStep,
    handleSubmit
  };
};
