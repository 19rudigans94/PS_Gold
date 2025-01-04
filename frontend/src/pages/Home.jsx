import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Monitor, Clock, CreditCard } from 'lucide-react';

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Играйте в любимые игры без лишних трат
            </h1>
            <p className="text-xl mb-8">
              Арендуйте игры и консоли по доступным ценам
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/games" className="btn bg-white text-blue-600 hover:bg-gray-100">
                Смотреть игры
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Наши преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Gamepad2 className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Большой выбор</h3>
              <p className="text-gray-600">Более 100 игр для разных консолей</p>
            </div>
            <div className="text-center p-6">
              <Monitor className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Современные консоли</h3>
              <p className="text-gray-600">PS5, Xbox Series X и Nintendo Switch</p>
            </div>
            <div className="text-center p-6">
              <Clock className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Гибкие сроки</h3>
              <p className="text-gray-600">Аренда от 1 дня до месяца</p>
            </div>
            <div className="text-center p-6">
              <CreditCard className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Удобная оплата</h3>
              <p className="text-gray-600">Принимаем карты и наличные</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;