import { authAPI } from './api';
import { toast } from 'react-toastify';

class AuthService {
  async register(userData) {
    try {
      const response = await authAPI.register(userData);
      toast.success('Registration successful!');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  }

  async login(credentials) {
    try {
      const response = await authAPI.login(credentials);
      toast.success('Welcome back!');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  }

  async checkAuth() {
    try {
      return await authAPI.checkAuth();
    } catch (error) {
      // Don't show error toast for auth check
      throw error;
    }
  }

  async updateProfile(userId, userData) {
    try {
      const response = await authAPI.updateProfile(userId, userData);
      toast.success('Profile updated successfully!');
      return response;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
      throw error;
    }
  }

  async logout() {
    // Clear any auth tokens or user data
    localStorage.removeItem('user');
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    toast.info('You have been logged out');
  }
}

export default new AuthService();