import React from 'react';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex items-center py-4 border-b last:border-b-0">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-24 h-24 object-cover rounded-lg"
      />
      
      <div className="flex-grow ml-6">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-600">{item.price} ₽</p>
      </div>

      <div className="flex items-center">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onQuantityChange(item.id, e.target.value)}
          className="w-16 px-2 py-1 border rounded-lg mr-4 text-center"
        />
        
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default CartItem;
