// Константы статусов платежа
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
};

// Имитация API Kaspi
export const initKaspiPayment = async (orderData) => {
  return new Promise((resolve, reject) => {
    // Проверка обязательных полей
    if (!orderData.total || orderData.total <= 0) {
      reject(new Error('Некорректная сумма заказа'));
      return;
    }

    setTimeout(() => {
      resolve({
        paymentUrl: 'https://kaspi.kz/pay/example',
        paymentId: 'KASPI-' + Math.random().toString(36).substr(2, 9),
        amount: orderData.total,
        currency: 'KZT',
        description: `Заказ #${Math.floor(Math.random() * 1000000)}`,
        timestamp: new Date().toISOString()
      });
    }, 1000);
  });
};

export const checkPaymentStatus = async (paymentId) => {
  return new Promise((resolve, reject) => {
    if (!paymentId) {
      reject(new Error('ID платежа не указан'));
      return;
    }

    setTimeout(() => {
      // Имитация различных статусов оплаты для тестирования
      const statuses = [
        { status: PAYMENT_STATUS.SUCCESS, message: 'Оплата успешно завершена' },
        { status: PAYMENT_STATUS.PROCESSING, message: 'Платёж обрабатывается' },
        { status: PAYMENT_STATUS.FAILED, message: 'Ошибка при оплате' }
      ];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      resolve({
        paymentId,
        ...randomStatus,
        timestamp: new Date().toISOString()
      });
    }, 1000);
  });
};

export const cancelKaspiPayment = async (paymentId) => {
  return new Promise((resolve, reject) => {
    if (!paymentId) {
      reject(new Error('ID платежа не указан'));
      return;
    }

    setTimeout(() => {
      resolve({
        status: PAYMENT_STATUS.CANCELLED,
        message: 'Платёж успешно отменён',
        paymentId,
        timestamp: new Date().toISOString()
      });
    }, 1000);
  });
};