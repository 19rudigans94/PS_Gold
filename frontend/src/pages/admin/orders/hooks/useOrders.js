import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../../services/api';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        status: selectedStatus !== 'all' ? selectedStatus : '',
        search: searchTerm,
        startDate: dateRange.start,
        endDate: dateRange.end
      });

      const response = await api.get(`/orders?${params}`);
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error('Ошибка при загрузке заказов');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, selectedStatus, searchTerm, dateRange]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      toast.success('Статус заказа обновлен');
      fetchOrders();
    } catch (error) {
      toast.error('Ошибка при обновлении статуса заказа');
      console.error('Error updating order status:', error);
    }
  };

  return {
    orders,
    loading,
    searchTerm,
    selectedStatus,
    dateRange,
    currentPage,
    totalPages,
    handleSearch,
    handleStatusChange,
    handleDateRangeChange,
    handlePageChange,
    updateOrderStatus
  };
};
