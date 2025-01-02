import React from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { ordersAPI } from '../../../services/api';

function OrderDetails({ order, onClose, onStatusUpdate }) {
  const handleStatusChange = async (newStatus) => {
    try {
      await ordersAPI.updateOrder(order._id || order.id, { status: newStatus });
      toast.success('Статус заказа успешно обновлен');
      onStatusUpdate && onStatusUpdate(newStatus);
    } catch (err) {
      console.error('Error updating order status:', err);
      toast.error('Не удалось обновить статус заказа');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            Детали заказа {order.orderNumber}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Информация о клиенте */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Информация о клиенте
            </h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-900">{order.customer}</p>
            </div>
          </div>

          {/* Информация о заказе */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Информация о заказе
            </h4>
            <div className="bg-gray-50 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Дата заказа:</span>
                <span className="text-sm text-gray-900">
                  {new Date(order.date).toLocaleDateString('ru-RU')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Статус:</span>
                <span className="text-sm font-medium">
                  {order.status === 'pending' && 'Ожидает'}
                  {order.status === 'processing' && 'В обработке'}
                  {order.status === 'completed' && 'Выполнен'}
                </span>
              </div>
            </div>
          </div>

          {/* Товары */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Товары
            </h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase">
                      Наименование
                    </th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase">
                      Количество
                    </th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase">
                      Цена
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="py-2 text-sm text-gray-900 text-right">
                        {item.quantity}
                      </td>
                      <td className="py-2 text-sm text-gray-900 text-right">
                        {item.price.toLocaleString('ru-RU')} ₽
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" className="py-2 text-sm font-medium text-gray-900 text-right">
                      Итого:
                    </td>
                    <td className="py-2 text-sm font-medium text-gray-900 text-right">
                      {order.total.toLocaleString('ru-RU')} ₽
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;