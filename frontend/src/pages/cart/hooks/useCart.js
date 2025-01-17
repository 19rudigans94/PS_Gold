import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../../../store/slices/cartSlice';
import { toast } from 'react-toastify';

export const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleQuantityChange = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(newQuantity) }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Игра удалена из корзины');
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Корзина пуста');
      return;
    }
    navigate('/checkout');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return {
    items,
    total,
    isAuthenticated,
    handleQuantityChange,
    handleRemoveItem,
    handleCheckout,
    handleClearCart
  };
};
