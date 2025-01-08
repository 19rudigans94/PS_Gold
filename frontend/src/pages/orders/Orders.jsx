import React from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import OrdersList from './components/OrdersList';
import { useOrders } from './hooks/useOrders';

const Orders = () => {
  const { orders, isLoading, formatDate, getStatusBadge } = useOrders();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Мои заказы</h1>
      <OrdersList
        orders={orders}
        formatDate={formatDate}
        getStatusBadge={getStatusBadge}
      />
    </div>
  );
};

export default Orders;
