import React from 'react';

const OrderItemsList = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <img
              src={item.game.image}
              alt={item.game.title}
              className="h-16 w-16 object-cover rounded"
            />
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900">
                {item.game.title}
              </h4>
              <p className="text-sm text-gray-500">
                Количество: {item.quantity}
              </p>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
          </span>
        </div>
      ))}
    </div>
  );
};

export default OrderItemsList;
