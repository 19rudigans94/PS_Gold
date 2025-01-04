import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Добавляем токен к каждому запросу
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Если отправляем FormData, убираем Content-Type
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Обрабатываем ответы
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('Response error:', error);

    // Если сервер недоступен
    if (!error.response) {
      return Promise.reject({
        message: 'Сервер недоступен. Пожалуйста, попробуйте позже.'
      });
    }

    // Если неавторизован
    if (error.response.status === 401) {
      Cookies.remove('authToken');
      window.location.href = '/login';
      return Promise.reject({
        message: 'Необходима авторизация'
      });
    }

    // Если запрещен доступ
    if (error.response.status === 403) {
      return Promise.reject({
        message: 'Доступ запрещен'
      });
    }

    return Promise.reject(error.response?.data || {
      message: 'Произошла ошибка при выполнении запроса'
    });
  }
);

// API методы
const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  checkAuth: () => api.get('/auth/check'),
  updateProfile: (userId, data) => api.put(`/users/${userId}`, data)
};

const productsAPI = {
  // Games
  getGames: () => api.get('/games'),
  getGame: (id) => api.get(`/games/${id}`),
  createGame: (data) => api.post('/games', data),
  updateGame: (id, data) => api.put(`/games/${id}`, data),
  deleteGame: (id) => api.delete(`/games/${id}`),
};

const ordersAPI = {
  getOrders: () => api.get('/orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  createOrder: (data) => api.post('/orders', data),
  updateOrder: (id, data) => api.put(`/orders/${id}`, data),
  deleteOrder: (id) => api.delete(`/orders/${id}`),
  getOrderStatistics: (params) => api.get('/orders/statistics', { params })
};

const usersAPI = {
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  createUser: (data) => api.post('/users', data),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
  getUserStatistics: () => api.get('/users/statistics'),
  uploadAvatar: async (userId, formData) => {
    try {
      const response = await api.post(`/users/${userId}/avatar`, formData);
      if (!response.avatar) {
        throw new Error('Ответ сервера не содержит информации об аватаре');
      }
      return response;
    } catch (error) {
      console.error('API Error - uploadAvatar:', error);
      throw error.response?.data || error;
    }
  }
};

const paymentAPI = {
  initKaspiPayment: (data) => api.post('/payments/kaspi/init', data),
  checkKaspiPayment: (paymentId) => api.get(`/payments/kaspi/check/${paymentId}`),
  cancelKaspiPayment: (paymentId) => api.post(`/payments/kaspi/cancel/${paymentId}`),
  getPaymentStatistics: (params) => api.get('/payments/statistics', { params })
};

const settingsAPI = {
  getSettings: () => api.get('/settings'),
  updateSettings: (data) => api.put('/settings', data),
  getSetting: (id) => api.get(`/settings/${id}`),
  createSetting: (data) => api.post('/settings', data),
  updateSetting: (id, data) => api.put(`/settings/${id}`, data),
  deleteSetting: (id) => api.delete(`/settings/${id}`)
};

const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
  getMessages: () => api.get('/contact'),
  getMessage: (id) => api.get(`/contact/${id}`),
  updateMessageStatus: (id, status) => api.put(`/contact/${id}/status`, { status }),
  deleteMessage: (id) => api.delete(`/contact/${id}`)
};

export {
  api as default,
  authAPI,
  productsAPI,
  ordersAPI,
  usersAPI,
  paymentAPI,
  settingsAPI,
  contactAPI
};