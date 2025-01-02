import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Box, Container, Grid, Typography, TextField, Button, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { sendContactMessage, resetStatus } from '../store/slices/contactSlice';
import { useSettings } from '../hooks/useSettings';

const schema = yup.object({
  name: yup
    .string()
    .required('Имя обязательно')
    .min(2, 'Имя должно содержать минимум 2 символа'),
  email: yup
    .string()
    .email('Введите корректный email')
    .required('Email обязателен'),
  message: yup
    .string()
    .required('Сообщение обязательно')
    .min(10, 'Сообщение должно содержать минимум 10 символов'),
}).required();

const ContactInfo = memo(({ icon: Icon, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    <Icon className="h-5 w-5 mr-2 text-blue-600" />
    <Typography variant="body1" color="textSecondary">{text}</Typography>
  </Box>
));

function Contact() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.contact);
  const { settings } = useSettings();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (success) {
      toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
      reset();
      dispatch(resetStatus());
    }
    if (error) {
      toast.error(error || 'Произошла ошибка при отправке сообщения');
      dispatch(resetStatus());
    }
  }, [success, error, reset, dispatch]);

  const onSubmit = (data) => {
    dispatch(sendContactMessage(data));
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" color="textPrimary">
        Свяжитесь с нами
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom color="textPrimary">
              Контактная информация
            </Typography>
            <Box sx={{ mt: 2 }}>
              {settings.general.phoneNumber && (
                <ContactInfo icon={Phone} text={settings.general.phoneNumber} />
              )}
              {settings.general.supportEmail && (
                <ContactInfo icon={Mail} text={settings.general.supportEmail} />
              )}
              {settings.general.address && (
                <ContactInfo icon={MapPin} text={settings.general.address} />
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom color="textPrimary">
              Форма обратной связи
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Имя"
                fullWidth
                margin="normal"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Сообщение"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                {...register('message')}
                error={!!errors.message}
                helperText={errors.message?.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                disabled={loading}
              >
                Отправить
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contact;