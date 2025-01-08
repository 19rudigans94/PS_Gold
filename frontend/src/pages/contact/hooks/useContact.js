import { useState } from 'react';
import { toast } from 'react-toastify';

export const useContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // В реальном приложении здесь будет отправка на сервер
    toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
};
