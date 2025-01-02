import React from 'react';
import { CreditCard, Banknote } from 'lucide-react';

function PaymentMethods({ selectedMethod, onSelect, total }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Способ оплаты</h3>
      
      <div className="space-y-3">
        <div
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedMethod === 'cash' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-200'
          }`}
          onClick={() => onSelect('cash')}
        >
          <Banknote className="h-6 w-6 text-gray-500 mr-3" />
          <div className="flex-grow">
            <h4 className="font-medium">Наличными при получении</h4>
            <p className="text-sm text-gray-500">Оплата курьеру при доставке</p>
          </div>
          <input
            type="radio"
            checked={selectedMethod === 'cash'}
            onChange={() => onSelect('cash')}
            className="h-4 w-4 text-blue-600"
          />
        </div>

        <div
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedMethod === 'kaspi' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-200'
          }`}
          onClick={() => onSelect('kaspi')}
        >
          <CreditCard className="h-6 w-6 text-gray-500 mr-3" />
          <div className="flex-grow">
            <h4 className="font-medium">Kaspi.kz</h4>
            <p className="text-sm text-gray-500">Быстрая оплата через Kaspi QR</p>
            <p className="text-xs text-gray-500 mt-1">
              Сумма к оплате: {total} ₽
            </p>
          </div>
          <input
            type="radio"
            checked={selectedMethod === 'kaspi'}
            onChange={() => onSelect('kaspi')}
            className="h-4 w-4 text-blue-600"
          />
        </div>
      </div>

      {selectedMethod === 'kaspi' && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg space-y-2">
          <p className="text-sm text-yellow-800">
            После подтверждения заказа вы будете перенаправлены на страницу оплаты Kaspi.kz
          </p>
          <ul className="text-sm text-yellow-800 list-disc list-inside">
            <li>Отсканируйте QR-код в приложении Kaspi.kz</li>
            <li>Подтвердите оплату в приложении</li>
            <li>Дождитесь подтверждения платежа</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default PaymentMethods;