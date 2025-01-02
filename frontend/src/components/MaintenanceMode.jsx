import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { Wrench } from 'lucide-react';

export const MaintenanceMode = ({ children }) => {
  const { maintenanceMode, maintenanceMessage, siteName } = useSettings();

  if (!maintenanceMode) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <Wrench className="w-16 h-16 mx-auto text-blue-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {siteName} на техническом обслуживании
        </h1>
        <p className="text-gray-600 mb-4">
          {maintenanceMessage || 'Сайт временно недоступен. Пожалуйста, попробуйте позже.'}
        </p>
        <div className="animate-pulse flex justify-center">
          <div className="h-2 w-24 bg-blue-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
