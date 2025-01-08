import React from 'react';

const OrderKeys = ({ items }) => {
  return (
    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
      <h4 className="text-sm font-medium text-gray-900 mb-4">
        Ключи активации
      </h4>
      <div className="space-y-2">
        {items.map((item) => (
          item.key && (
            <div
              key={`${item.id}-key`}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
            >
              <span className="text-sm text-gray-600">
                {item.game.title}
              </span>
              <code className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">
                {item.key}
              </code>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default OrderKeys;
