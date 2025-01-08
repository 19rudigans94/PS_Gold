import React from 'react';
import { Link } from 'react-router-dom';

const LoginHeader = () => {
  return (
    <div>
      <img
        className="mx-auto h-12 w-auto"
        src="/game-controller.svg"
        alt="GameGold Logo"
      />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Войти в аккаунт
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Или{' '}
        <Link
          to="/register"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          зарегистрируйтесь
        </Link>
        , если у вас еще нет аккаунта
      </p>
    </div>
  );
};

export default LoginHeader;
