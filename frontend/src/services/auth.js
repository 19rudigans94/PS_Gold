import { authAPI } from './api';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

class AuthService {
  async register(userData) {
    try {
      const response = await authAPI.register(userData);
      if (response.token) {
        Cookies.set('authToken', response.token, { expires: 7 });
      }
      toast.success('Регистрация успешна!');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Ошибка при регистрации';
      toast.error(message);
      throw error;
    }
  }

  async login(credentials) {
    try {
      const response = await authAPI.login(credentials);
      if (response.token) {
        Cookies.set('authToken', response.token, { expires: 7 });
      }
      toast.success('Добро пожаловать!');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Ошибка при входе';
      toast.error(message);
      throw error;
    }
  }

  async checkAuth() {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error('Токен не найден');
      }
      return await authAPI.checkAuth();
    } catch (error) {
      Cookies.remove('authToken');
      throw error;
    }
  }

  async updateProfile(userId, userData) {
    try {
      const response = await authAPI.updateProfile(userId, userData);
      toast.success('Профиль успешно обновлен!');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Ошибка при обновлении профиля';
      toast.error(message);
      throw error;
    }
  }

  logout() {
    Cookies.remove('authToken');
    toast.info('Вы вышли из системы');
  }

  getAuthToken() {
    return Cookies.get('authToken');
  }

  isAuthenticated() {
    return !!this.getAuthToken();
  }
}

export default new AuthService();