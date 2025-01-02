import React, { useState, useEffect } from 'react';
import CourierInfo from '../components/tracking/CourierInfo';
import DeliveryMap from '../components/tracking/DeliveryMap';
import { getCourierLocation } from '../services/courier';
import { defaultMapConfig } from '../config/mapConfig';

const Tracking = () => {
  const [courierData, setCourierData] = useState(null);
  const deliveryAddress = defaultMapConfig.defaultCenter;

  useEffect(() => {
    const updateCourierLocation = async () => {
      try {
        const data = await getCourierLocation();
        setCourierData(data);
      } catch (error) {
        console.error('Ошибка при получении местоположения курьера:', error);
      }
    };

    updateCourierLocation();
    const interval = setInterval(updateCourierLocation, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!courierData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Отслеживание доставки</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CourierInfo
            status={courierData.status}
            estimatedTime={courierData.estimatedTime}
          />
        </div>

        <div className="lg:col-span-2">
          <DeliveryMap
            courierLocation={courierData.coordinates}
            deliveryAddress={deliveryAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default Tracking;