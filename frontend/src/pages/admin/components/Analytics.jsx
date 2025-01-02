import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const data = {
    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
    datasets: [
      {
        label: 'Продажи',
        data: [30, 45, 35, 50, 40, 60],
        fill: false,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1,
      },
      {
        label: 'Выручка',
        data: [50, 65, 55, 70, 60, 80],
        fill: false,
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
}

export default Analytics;