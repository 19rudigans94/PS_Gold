import { useState } from 'react';

const useForm = (initialState, validate, onSubmit) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку поля при изменении
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        await onSubmit(formData);
      } catch (error) {
        // Обработка ошибок происходит в компоненте
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
    setLoading(false);
  };

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    resetForm,
    setErrors
  };
};

export default useForm;
