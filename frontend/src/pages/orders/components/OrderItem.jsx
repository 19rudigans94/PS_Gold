import React from 'react';
import OrderItemsList from './OrderItemsList';
import OrderKeys from './OrderKeys';

const OrderItem = ({ order, formatDate, getStatusBadge }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Заказ #{order.id}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium text-gray-900">
            {order.total.toLocaleString('ru-RU')} ₽
          </span>
          {getStatusBadge(order.status)}
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <OrderItemsList items={order.items} />
        </div>
      </div>

      {order.status === 'completed' && order.items.some(item => item.key) && (
        <OrderKeys items={order.items} />
      )}
    </div>
  );
};

export default OrderItem;
