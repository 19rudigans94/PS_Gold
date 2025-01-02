// Имитация API для получения данных о местоположении курьера
export const getCourierLocation = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        coordinates: [55.751244, 37.618423], // Координаты курьера (центр Москвы)
        status: 'В пути',
        estimatedTime: '25 минут'
      });
    }, 1000);
  });
};