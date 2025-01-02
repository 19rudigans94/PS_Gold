import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import { LogIn } from 'lucide-react';
import { toast } from 'react-toastify';
import FormInput from '../ui/FormInput';
import Button from '../ui/Button';
import useForm from '../../hooks/useForm';
import { validateEmail, validatePassword } from '../../utils/validators';

function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateLoginForm = (data) => {
    const errors = {};
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);

    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return errors;
  };

  const handleLoginSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast.success('Вход выполнен успешно!');
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Ошибка входа';
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
    { email: '', password: '' },
    validateLoginForm,
    handleLoginSubmit
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Вход в аккаунт
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Или{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              зарегистрируйтесь
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Забыли пароль?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              loading={loading}
              icon={<LogIn className="w-4 h-4" />}
              fullWidth
            >
              Войти
            </Button>
          </div>

          <div className="text-sm text-center">
            <span className="text-gray-500">Нет аккаунта?</span>{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Зарегистрироваться
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;