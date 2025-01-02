import React from 'react';
import { MapPin, Package, Clock } from 'lucide-react';

function CourierInfo({ status, estimatedTime }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Информация о заказе</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <Package className="h-5 w-5 text-blue-600 mr-3" />
          <div>
            <p className="font-medium">Статус доставки</p>
            <p className="text-gray-600">{status}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Clock className="h-5 w-5 text-blue-600 mr-3" />
          <div>
            <p className="font-medium">Ожидаемое время доставки</p>
            <p className="text-gray-600">Примерно через {estimatedTime}</p>
          </div>
        </div>

        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-blue-600 mr-3" />
          <div>
            <p className="font-medium">Адрес доставки</p>
            <p className="text-gray-600">ул. Тверская, д. 1, Москва</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          Курьер свяжется с вами за 15-20 минут до прибытия
        </p>
      </div>
    </div>
  );
}

export default CourierInfo;