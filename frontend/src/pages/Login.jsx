import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from "@/layouts/AuthLayout";
import { loginUser } from '../store/slices/authSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import store from '../store/store';

const schema = yup.object({
  email: yup
    .string()
    .email('Введите корректный email')
    .required('Email обязателен'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен содержать минимум 6 символов'),
}).required();

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data));
      const currentUser = store.getState().auth.user;
      
      // Проверяем, есть ли сохраненный путь для перенаправления
      const from = location.state?.from?.pathname || (currentUser?.role === 'admin' ? '/admin' : '/');
      navigate(from, { replace: true });
      
      toast.success('Вход выполнен успешно!');
    } catch (error) {
      toast.error(error.message || 'Произошла ошибка при входе');
    }
  };

  return (
    <AuthLayout title="Вход в аккаунт">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail />
              </InputAdornment>
            ),
          }}
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting}
        >
          Войти
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/register" variant="body2">
            Нет аккаунта? Зарегистрироваться
          </Link>
          <Link to="/forgot-password" variant="body2">
            Забыли пароль?
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
}

export default Login;