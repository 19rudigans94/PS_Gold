import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/slices/authSlice';
import { UserPlus } from 'lucide-react';
import { toast } from 'react-toastify';
import FormInput from '../ui/FormInput';
import Button from '../ui/Button';
import useForm from '../../hooks/useForm';
import { validateEmail, validatePassword, validateName, validatePasswordConfirmation } from '../../utils/validators';

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateRegisterForm = (data) => {
    const errors = {};
    const nameError = validateName(data.name);
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);
    const confirmPasswordError = validatePasswordConfirmation(data.password, data.confirmPassword);

    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    return errors;
  };

  const handleRegisterSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success('Регистрация успешна!');
      navigate('/login');
    } catch (error) {
      const message = error.response?.data?.message || 'Ошибка регистрации';
      toast.error(message);
    }
  };

  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit
  } = useForm(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validateRegisterForm,
    handleRegisterSubmit
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Регистрация
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Войти
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <FormInput
            label="Имя"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <FormInput
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            showPasswordToggle
            onPasswordToggle={() => setShowPassword(!showPassword)}
          />

          <FormInput
            label="Подтверждение пароля"
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            showPasswordToggle
            onPasswordToggle={() => setShowPassword(!showPassword)}
          />

          <Button
            type="submit"
            loading={loading}
            icon={<UserPlus className="w-4 h-4" />}
            fullWidth
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;