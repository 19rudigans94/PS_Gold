import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Важно для работы с куки
});

// Интерцептор для добавления токена к запросам
api.interceptors.request.use(
  (config) => {
    // Токен будет отправляться автоматически через httpOnly куки
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ответов
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Обработка неавторизованного доступа
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`)
};

export const gameKeysAPI = {
  getAll: () => api.get('/game-keys'),
  getById: (id) => api.get(`/game-keys/${id}`),
  create: (data) => api.post('/game-keys', data),
  update: (id, data) => api.put(`/game-keys/${id}`, data),
  delete: (id) => api.delete(`/game-keys/${id}`),
  toggleVisibility: (id) => api.patch(`/game-keys/${id}/toggle-visibility`)
};

export default api;
