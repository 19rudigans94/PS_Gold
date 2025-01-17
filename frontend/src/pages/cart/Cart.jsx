import React from 'react';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';
import LoginRequired from './components/LoginRequired';
import { useCart } from './hooks/useCart';

const Cart = () => {
  const {
    items,
    total,
    isAuthenticated,
    handleQuantityChange,
    handleRemoveItem,
    handleCheckout,
    handleClearCart
  } = useCart();

  if (!isAuthenticated) {
    return <LoginRequired />;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveItem}
          />
        ))}
      </div>

      <CartSummary
        total={total}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Cart;
