import React, { useState } from 'react';
import GamesManagement from './components/GamesManagement';
import ConsolesManagement from './components/ConsolesManagement';

function Catalog() {
  const [activeTab, setActiveTab] = useState('games');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('games')}
              className={`${
                activeTab === 'games'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Игры
            </button>
            <button
              onClick={() => setActiveTab('consoles')}
              className={`${
                activeTab === 'consoles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Консоли
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'games' ? <GamesManagement /> : <ConsolesManagement />}
    </div>
  );
}

export default Catalog;