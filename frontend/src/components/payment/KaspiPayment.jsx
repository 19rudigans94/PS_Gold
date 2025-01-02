import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, Loader } from 'lucide-react';
import { PAYMENT_STATUS, checkPaymentStatus, cancelKaspiPayment } from '../../services/payment';

function KaspiPayment({ paymentId, onSuccess, onError, onCancel }) {
  const [status, setStatus] = useState(PAYMENT_STATUS.PENDING);
  const [message, setMessage] = useState('');
  const [isPolling, setIsPolling] = useState(true);

  useEffect(() => {
    let pollInterval;
    
    const pollPaymentStatus = async () => {
      try {
        const result = await checkPaymentStatus(paymentId);
        setStatus(result.status);
        setMessage(result.message);

        if (result.status === PAYMENT_STATUS.SUCCESS) {
          setIsPolling(false);
          onSuccess(result);
        } else if (result.status === PAYMENT_STATUS.FAILED) {
          setIsPolling(false);
          onError(result);
        }
      } catch (error) {
        setStatus(PAYMENT_STATUS.FAILED);
        setMessage(error.message);
        setIsPolling(false);
        onError(error);
      }
    };

    if (isPolling) {
      pollInterval = setInterval(pollPaymentStatus, 3000);
      pollPaymentStatus();
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [paymentId, isPolling, onSuccess, onError]);

  const handleCancel = async () => {
    try {
      await cancelKaspiPayment(paymentId);
      setStatus(PAYMENT_STATUS.CANCELLED);
      setMessage('Платёж отменён');
      setIsPolling(false);
      onCancel();
    } catch (error) {
      setMessage('Ошибка при отмене платежа');
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case PAYMENT_STATUS.SUCCESS:
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case PAYMENT_STATUS.FAILED:
      case PAYMENT_STATUS.CANCELLED:
        return <XCircle className="h-8 w-8 text-red-500" />;
      case PAYMENT_STATUS.PROCESSING:
      case PAYMENT_STATUS.PENDING:
        return <Loader className="h-8 w-8 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case PAYMENT_STATUS.SUCCESS:
        return 'bg-green-50 border-green-200';
      case PAYMENT_STATUS.FAILED:
      case PAYMENT_STATUS.CANCELLED:
        return 'bg-red-50 border-red-200';
      case PAYMENT_STATUS.PROCESSING:
      case PAYMENT_STATUS.PENDING:
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor()}`}>
      <div className="flex items-center space-x-4">
        {getStatusIcon()}
        <div className="flex-grow">
          <h4 className="font-medium">
            {status === PAYMENT_STATUS.PENDING && 'Ожидание оплаты'}
            {status === PAYMENT_STATUS.PROCESSING && 'Обработка платежа'}
            {status === PAYMENT_STATUS.SUCCESS && 'Оплата успешна'}
            {status === PAYMENT_STATUS.FAILED && 'Ошибка оплаты'}
            {status === PAYMENT_STATUS.CANCELLED && 'Платёж отменён'}
          </h4>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>

      {(status === PAYMENT_STATUS.PENDING || status === PAYMENT_STATUS.PROCESSING) && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCancel}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Отменить платёж
          </button>
        </div>
      )}
    </div>
  );
}

export default KaspiPayment;