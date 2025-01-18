import axios from 'axios';

const BASE_URL = `${window.location.protocol}//${window.location.host}/api`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];
let logoutCallback = null;

export const setLogoutCallback = (callback) => {
  logoutCallback = callback;
};

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post('/auth/refresh-token');
        processQueue(null, response.data);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        if (logoutCallback) {
          logoutCallback();
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 403) {
      console.error('Доступ запрещен');
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
