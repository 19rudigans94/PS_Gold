import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../../store/slices/authSlice';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const actionResult = await dispatch(login(formData)).unwrap();
      
      if (actionResult.success && actionResult.data?.user) {
        const { user } = actionResult.data;
        const from = location.state?.from?.pathname;
        
        if (user.role === 'admin' && (!from || from === '/')) {
          navigate('/admin/dashboard', { replace: true });
        } else if (from) {
          navigate(from, { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit
  };
};
