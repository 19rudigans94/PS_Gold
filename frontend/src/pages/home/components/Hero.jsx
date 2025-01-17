import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/game-pattern.svg')] opacity-10"></div>
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Откройте мир цифровых игр с GameGold
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            Огромный выбор игр, мгновенная доставка ключей и лучшие цены. 
            Начните свое игровое приключение прямо сейчас!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/games"
              className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              <span>Смотреть каталог</span>
              <svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Создать аккаунт
            </Link>
          </div>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
        <div className="w-64 h-64 bg-blue-500 rounded-full opacity-20 filter blur-3xl"></div>
      </div>
      <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4">
        <div className="w-64 h-64 bg-blue-300 rounded-full opacity-20 filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
