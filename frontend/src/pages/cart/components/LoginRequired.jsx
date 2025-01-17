import React from 'react';
import { Link } from 'react-router-dom';

const LoginRequired = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Для доступа к корзине необходимо войти</h2>
      <Link
        to="/login"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Войти
      </Link>
    </div>
  );
};

export default LoginRequired;
