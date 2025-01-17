import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../../services/api';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage,
        limit: 10
      });

      if (selectedRole) {
        params.append('role', selectedRole);
      }

      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await api.get(`/users?${params}`);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch users');
      }

      setUsers(response.data.data);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Ошибка при загрузке пользователей';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, selectedRole, searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role === 'all' ? '' : role);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenDialog = (user = null) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setOpenDialog(false);
  };

  const handleUpdateUser = async (userData) => {
    try {
      setLoading(true);
      const response = await api.put(`/users/${selectedUser.id}`, userData);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update user');
      }

      toast.success('Пользователь успешно обновлен');
      handleCloseDialog();
      fetchUsers();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Ошибка при обновлении пользователя';
      toast.error(errorMessage);
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/users/${id}`);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete user');
      }

      toast.success('Пользователь успешно удален');
      fetchUsers();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Ошибка при удалении пользователя';
      toast.error(errorMessage);
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    searchTerm,
    selectedRole,
    currentPage,
    totalPages,
    openDialog,
    selectedUser,
    handleSearch,
    handleRoleChange,
    handlePageChange,
    handleOpenDialog,
    handleCloseDialog,
    handleUpdateUser,
    handleDeleteUser,
    refresh: fetchUsers
  };
};
