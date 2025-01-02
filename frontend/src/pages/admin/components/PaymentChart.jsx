import React, { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';

function PaymentChart() {
  const [period, setPeriod] = useState('week');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  // В реальном приложении данные будут приходить с API
  const rawData = useMemo(() => ({
    week: {
      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      kaspi: [12000, 15000, 18000, 14000, 22000, 19000, 16000],
      cash: [8000, 10000, 9000, 11000, 15000, 12000, 13000]
    },
    month: {
      labels: [...Array(30)].map((_, i) => (i + 1).toString()),
      kaspi: [...Array(30)].map(() => Math.floor(Math.random() * 25000) + 10000),
      cash: [...Array(30)].map(() => Math.floor(Math.random() * 20000) + 8000)
    },
    year: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      kaspi: [...Array(12)].map(() => Math.floor(Math.random() * 500000) + 200000),
      cash: [...Array(12)].map(() => Math.floor(Math.random() * 400000) + 150000)
    }
  }), []);

  const data = useMemo(() => {
    if (dateRange.start && dateRange.end) {
      // В реальном приложении здесь будет фильтрация по выбранному диапазону дат
      return rawData[period];
    }
    return rawData[period];
  }, [period, dateRange, rawData]);

  const maxValue = Math.max(...[...data.kaspi, ...data.cash]);
  const chartHeight = 180;

  const totalKaspi = data.kaspi.reduce((sum, value) => sum + value, 0);
  const totalCash = data.cash.reduce((sum, value) => sum + value, 0);
  const total = totalKaspi + totalCash;
  const kaspiPercentage = ((totalKaspi / total) * 100).toFixed(1);
  const cashPercentage = ((totalCash / total) * 100).toFixed(1);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    setDateRange({ start: '', end: '' });
  };

  return (
    <div className="space-y-6">
      {/* Контролы периода */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex space-x-2">
          <button
            onClick={() => handlePeriodChange('week')}
            className={`px-3 py-1 rounded-lg text-sm ${
              period === 'week'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Неделя
          </button>
          <button
            onClick={() => handlePeriodChange('month')}
            className={`px-3 py-1 rounded-lg text-sm ${
              period === 'month'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Месяц
          </button>
          <button
            onClick={() => handlePeriodChange('year')}
            className={`px-3 py-1 rounded-lg text-sm ${
              period === 'year'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Год
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            className="input py-1 px-2 text-sm"
          />
          <span className="text-gray-500">—</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            className="input py-1 px-2 text-sm"
          />
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Всего через Kaspi</p>
          <p className="text-xl font-semibold">{totalKaspi.toLocaleString()} ₽</p>
          <p className="text-sm text-blue-600">{kaspiPercentage}% от общей суммы</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Всего наличными</p>
          <p className="text-xl font-semibold">{totalCash.toLocaleString()} ₽</p>
          <p className="text-sm text-green-600">{cashPercentage}% от общей суммы</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Общая сумма</p>
          <p className="text-xl font-semibold">{total.toLocaleString()} ₽</p>
          <p className="text-sm text-gray-600">За выбранный период</p>
        </div>
      </div>

      {/* График */}
      <div className="relative h-[250px] overflow-hidden">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-[200px] flex flex-col justify-between text-xs text-gray-500">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="h-6 flex items-center">
              {Math.round((maxValue / 5) * (5 - i) / 1000)}K
            </span>
          ))}
        </div>

        {/* Chart */}
        <div className="ml-8 h-[200px] flex items-end overflow-x-auto">
          <div className="flex-grow h-full flex items-end space-x-1" style={{ minWidth: `${Math.max(data.labels.length * 40, 300)}px` }}>
            {data.labels.map((label, index) => (
              <div key={label} className="flex-1 flex flex-col items-center justify-end">
                <div className="w-full flex flex-col items-center space-y-1">
                  {/* Kaspi bar */}
                  <div
                    className="w-4 bg-blue-500 rounded-t transition-all duration-300 relative group"
                    style={{
                      height: `${(data.kaspi[index] / maxValue) * chartHeight}px`
                    }}
                  >
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                      {data.kaspi[index].toLocaleString()} ₽
                    </div>
                  </div>
                  {/* Cash bar */}
                  <div
                    className="w-4 bg-green-500 rounded-t transition-all duration-300 relative group"
                    style={{
                      height: `${(data.cash[index] / maxValue) * chartHeight}px`
                    }}
                  >
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                      {data.cash[index].toLocaleString()} ₽
                    </div>
                  </div>
                </div>
                {/* X-axis label */}
                <span className="mt-2 text-xs text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute -bottom-6 right-0 flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
            <span className="text-xs text-gray-500">Kaspi</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
            <span className="text-xs text-gray-500">Наличные</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentChart;