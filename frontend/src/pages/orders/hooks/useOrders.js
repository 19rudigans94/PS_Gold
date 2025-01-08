import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../store/slices/ordersSlice';

export const useOrders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        text: 'В обработке',
        class: 'bg-yellow-100 text-yellow-800'
      },
      processing: {
        text: 'Обрабатывается',
        class: 'bg-blue-100 text-blue-800'
      },
      completed: {
        text: 'Выполнен',
        class: 'bg-green-100 text-green-800'
      },
      cancelled: {
        text: 'Отменен',
        class: 'bg-red-100 text-red-800'
      }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}`}>
        {config.text}
      </span>
    );
  };

  return {
    orders,
    isLoading,
    formatDate,
    getStatusBadge
  };
};
