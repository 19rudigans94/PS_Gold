import React from 'react';

const CartSummary = ({ total, onClearCart, onCheckout }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-semibold">Итого:</span>
        <span className="text-2xl font-bold">{total} ₽</span>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onClearCart}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Очистить корзину
        </button>
        
        <button
          onClick={onCheckout}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
