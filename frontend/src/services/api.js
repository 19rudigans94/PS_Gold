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
    // Если отправляем FormData, убираем Content-Type, чтобы axios установил правильный
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Обрабатываем ответы
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
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

  // Consoles
  getConsoles: () => api.get('/consoles'),
  getConsole: (id) => api.get(`/consoles/${id}`),
  createConsole: (data) => {
    // Если data уже является FormData, отправляем как есть
    if (data instanceof FormData) {
      return api.post('/consoles', data);
    }
    // Иначе создаем новый FormData
    const formData = new FormData();
    for (let key in data) {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key].toString());
      }
    }
    return api.post('/consoles', formData);
  },
  updateConsole: (id, data) => {
    // Если data уже является FormData, отправляем как есть
    if (data instanceof FormData) {
      return api.put(`/consoles/${id}`, data);
    }
    // Иначе создаем новый FormData
    const formData = new FormData();
    for (let key in data) {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key].toString());
      }
    }
    return api.put(`/consoles/${id}`, formData);
  },
  deleteConsole: (id) => api.delete(`/consoles/${id}`)
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
  uploadAvatar: (userId, formData) => {
    return api.post(`/users/${userId}/avatar`, formData);
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
  authAPI,
  productsAPI,
  ordersAPI,
  usersAPI,
  paymentAPI,
  settingsAPI,
  contactAPI
};

export default api;