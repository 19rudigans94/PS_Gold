import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../store/slices/authSlice';

export const useProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Необходимо ввести текущий пароль';
      }
      if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Новый пароль должен содержать минимум 6 символов';
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        newErrors.confirmNewPassword = 'Пароли не совпадают';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updateData = {
      name: formData.name,
      email: formData.email
    };

    if (formData.newPassword) {
      updateData.currentPassword = formData.currentPassword;
      updateData.newPassword = formData.newPassword;
    }

    try {
      await dispatch(updateProfile(updateData)).unwrap();
      setIsEditing(false);
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }));
    } catch (error) {
      // Ошибка уже обработана в slice
    }
  };

  return {
    formData,
    errors,
    isLoading,
    isEditing,
    setIsEditing,
    handleChange,
    handleSubmit
  };
};
