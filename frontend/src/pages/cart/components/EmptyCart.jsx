import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="text-center py-8">
      <p className="text-gray-500 mb-4">Ваша корзина пуста</p>
      <Link
        to="/games"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Перейти к играм
      </Link>
    </div>
  );
};

export default EmptyCart;
