import React, { useState, useEffect } from 'react';
import { Search, Eye, Package, Truck, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import OrderDetails from './components/OrderDetails';
import { ordersAPI } from '../../services/api';

function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await ordersAPI.getOrders();
      setOrders(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке заказов');
      toast.error('Не удалось загрузить список заказов');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await ordersAPI.updateOrder(orderId, { status: newStatus });
      toast.success('Статус заказа успешно обновлен');
      await fetchOrders();
    } catch (err) {
      console.error('Error updating order status:', err);
      toast.error('Не удалось обновить статус заказа');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        icon: Package,
        text: 'Ожидает',
        className: 'bg-yellow-100 text-yellow-800'
      },
      processing: {
        icon: Truck,
        text: 'В обработке',
        className: 'bg-blue-100 text-blue-800'
      },
      completed: {
        icon: CheckCircle,
        text: 'Выполнен',
        className: 'bg-green-100 text-green-800'
      }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`px-2 inline-flex items-center rounded-full ${config.className}`}>
        <Icon className="h-4 w-4 mr-1" />
        <span className="text-sm">{config.text}</span>
      </span>
    );
  };

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Заказы</h1>
        <p className="mt-1 text-sm text-gray-500">
          Управление заказами
        </p>
      </div>

      {/* Поиск */}
      <div className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Поиск заказов..."
          className="ml-2 flex-1 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Таблица заказов */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {loading ? (
          <div className="text-center py-4">Загрузка...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-600">{error}</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Номер заказа
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Клиент
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Сумма
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.orderNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString('ru-RU')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.total.toLocaleString('ru-RU')} ₽
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowDetails(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Модальное окно деталей заказа */}
      {showDetails && selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => {
            setShowDetails(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
}

export default Orders;