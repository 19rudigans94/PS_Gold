import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag, Trash2 } from 'lucide-react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  TextField,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
  Alert,
} from '@mui/material';
import PaymentMethods from '../components/payment/PaymentMethods';
import { removeItem, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { createOrder, resetStatus } from '../store/slices/orderSlice';
import { initKaspiPayment } from '../services/payment';
import { toast } from 'react-toastify';
import { useSettings } from '../hooks/useSettings';

function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { loading, error, success } = useSelector(state => state.orders);
  const { deliverySettings } = useSettings();
  
  // Если пользователь не авторизован, перенаправляем на страницу входа
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Для доступа к корзине необходимо авторизоваться');
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [useProfileData, setUseProfileData] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState(deliverySettings.defaultShippingMethod);
  
  // Рассчитываем стоимость доставки
  const calculateDeliveryPrice = () => {
    if (deliverySettings.enableFreeShipping && subtotal >= deliverySettings.freeDeliveryAmount) {
      return 0;
    }
    return deliverySettings.deliveryPrice || 300;
  };

  // Рассчитываем подытог
  useEffect(() => {
    const total = items.reduce((sum, item) => sum + calculateItemPrice(item), 0);
    setSubtotal(total);
  }, [items]);

  const deliveryPrice = calculateDeliveryPrice();
  const total = subtotal + deliveryPrice;

  useEffect(() => {
    if (user && useProfileData) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        address: user.address || '',
      });
    }
  }, [user, useProfileData]);

  useEffect(() => {
    if (success) {
      toast.success('Заказ успешно оформлен!');
      dispatch(clearCart());
      dispatch(resetStatus());
    }
    if (error) {
      toast.error(error);
      dispatch(resetStatus());
    }
  }, [success, error, dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    const item = items.find(item => item.id === id);
    if (!item) return;

    // Проверяем максимальное количество в зависимости от типа товара
    const maxQuantity = item.type === 'console' ? 1 : 5;
    
    if (newQuantity < 1) {
      toast.warning('Количество не может быть меньше 1');
      return;
    }
    
    if (newQuantity > maxQuantity) {
      toast.warning(`Максимальное доступное количество: ${maxQuantity}`);
      dispatch(updateQuantity({ id, quantity: maxQuantity }));
      return;
    }

    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
      dispatch(clearCart());
      toast.success('Корзина очищена');
    }
  };

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toLocaleString() : '0';
  };

  const calculateItemPrice = (item) => {
    const basePrice = item.price || 0;
    const quantity = item.quantity || 1;
    const rentalDays = item.type === 'console' ? (item.rentalDays || 1) : 1;
    return basePrice * quantity * rentalDays;
  };

  const validateForm = () => {
    const errors = [];
    
    // Проверка наличия товаров
    if (items.length === 0) {
      errors.push('Корзина пуста');
    }

    // Проверка данных доставки
    if (!formData.name?.trim()) errors.push('Укажите имя получателя');
    if (!formData.phone?.trim()) errors.push('Укажите номер телефона');
    if (!formData.email?.trim()) errors.push('Укажите email');
    if (!formData.address?.trim()) errors.push('Укажите адрес доставки');

    // Проверка корректности email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Укажите корректный email');
    }

    // Проверка номера телефона (должен начинаться с +7 и содержать 11 цифр)
    const phoneRegex = /^\+7\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.push('Номер телефона должен быть в формате +7XXXXXXXXXX');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация формы
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    try {
      // Подготовка данных заказа
      const orderItems = items.map(item => ({
        id: item.id,
        type: item.type,
        title: item.title,
        quantity: item.quantity || 1,
        price: item.type === 'console' 
          ? item.price * (item.rentalDays || 1)
          : item.price,
        ...(item.type === 'console' && { rentalDays: item.rentalDays || 1 })
      }));
      const orderData = {
        items: orderItems,
        total: calculateTotal(),
        delivery: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: formData.address.trim()
        },
        paymentMethod,
        status: 'pending'
      };

      // Обработка разных методов оплаты
      if (paymentMethod === 'kaspi') {
        toast.info('Перенаправление на страницу оплаты Kaspi...');
        const { paymentUrl } = await initKaspiPayment(orderData);
        if (!paymentUrl) {
          throw new Error('Не удалось получить ссылку на оплату');
        }
        window.location.href = paymentUrl;
      } else {
        toast.info('Оформление заказа...');
        const result = await dispatch(createOrder(orderData)).unwrap();
        
        if (result && result.id) {
          toast.success('Заказ успешно оформлен!');
          dispatch(clearCart());
        } else {
          throw new Error('Не удалось создать заказ');
        }
      }
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        'Произошла ошибка при оформлении заказа'
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleProfileData = () => {
    setUseProfileData(!useProfileData);
    if (!useProfileData && user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        address: user.address || '',
      });
    }
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingBag size={64} style={{ margin: '0 auto', color: '#9e9e9e' }} />
        <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
          Корзина пуста
        </Typography>
        <Typography color="text.secondary">
          Добавьте игры или консоли в корзину
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        Корзина
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            {items.map((item) => (
              <Box 
                key={`${item.type}-${item.id}`} 
                sx={{ py: 2, '&:not(:last-child)': { borderBottom: 1, borderColor: 'divider' } }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <Box
                      component="img"
                      src={item.imageUrl 
                        ? item.imageUrl.includes('uploads/') 
                          ? `${import.meta.env.VITE_API_URL}/${item.imageUrl}`
                          : `${import.meta.env.VITE_API_URL}/uploads/${item.imageUrl}`
                        : '/placeholder-image.png'
                      }
                      alt={item.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-image.png';
                      }}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '1',
                        objectFit: 'cover',
                        borderRadius: 1
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {item.title}
                    </Typography>
                    {item.type === 'console' && (
                      <Typography variant="body2" color="text.secondary">
                        Аренда на {item.rentalDays || 1} {item.rentalDays === 1 ? 'день' : 'дней'}
                      </Typography>
                    )}
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                      {formatPrice(item.price)} ₸{item.type === 'console' ? '/день' : ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Итого: {formatPrice(calculateItemPrice(item))} ₸
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                      <TextField
                        type="number"
                        size="small"
                        value={item.quantity || 1}
                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                        inputProps={{ min: 1 }}
                        sx={{ width: 80 }}
                      />
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(item.id)}
                        sx={{ ml: 1 }}
                      >
                        <Trash2 size={20} />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" align="right" fontWeight="medium">
                      {formatPrice(calculateItemPrice(item))} ₸
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                Итого:
              </Typography>
              <Typography variant="h6">
                {formatPrice(subtotal)} ₸
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                Доставка:
              </Typography>
              <Typography variant="h6">
                {deliveryPrice === 0 ? (
                  <span className="text-green-600">Бесплатно</span>
                ) : (
                  `${deliveryPrice} ₸`
                )}
              </Typography>
            </Box>
            {deliverySettings.enableFreeShipping && subtotal < deliverySettings.freeDeliveryAmount && (
              <Typography variant="body2" color="text.secondary">
                Добавьте товаров еще на {deliverySettings.freeDeliveryAmount - subtotal} ₸ для бесплатной доставки
              </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                Общая стоимость:
              </Typography>
              <Typography variant="h6">
                {formatPrice(total)} ₸
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Способ оплаты
            </Typography>
            <PaymentMethods
              selectedMethod={paymentMethod}
              onSelect={setPaymentMethod}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Данные доставки
            </Typography>

            {user && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={useProfileData}
                    onChange={toggleProfileData}
                  />
                }
                label="Использовать данные из профиля"
                sx={{ mb: 2 }}
              />
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="ФИО"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Телефон"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Адрес доставки"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading || items.length === 0}
                  >
                    {loading ? 'Оформление...' : 'Оформить заказ'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;