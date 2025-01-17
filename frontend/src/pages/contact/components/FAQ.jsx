import React from 'react';

const FAQ = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Часто задаваемые вопросы</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Как получить ключ после оплаты?</h4>
          <p className="text-gray-600">
            После успешной оплаты ключ будет отправлен на ваш email и появится в личном кабинете.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Что делать если ключ не работает?</h4>
          <p className="text-gray-600">
            Свяжитесь с нашей службой поддержки, мы поможем решить проблему или вернем деньги.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Какие способы оплаты вы принимаете?</h4>
          <p className="text-gray-600">
            Мы принимаем банковские карты, электронные кошельки и криптовалюту.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
