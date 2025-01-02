import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchConsoles } from '../store/slices/productsSlice';
import { addItem } from '../store/slices/cartSlice';
import AuthCartModal from '../components/modals/AuthCartModal';
import Cookies from 'js-cookie';

function Consoles() {
  const dispatch = useDispatch();
  const { consoles, loading, error } = useSelector(state => state.products);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const cartItems = useSelector(state => state.cart.items);

  const [rentalDays, setRentalDays] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedConsole, setSelectedConsole] = useState(null);

  useEffect(() => {
    dispatch(fetchConsoles());
  }, [dispatch]);

  const handleRentalDaysChange = (consoleId, days) => {
    const numDays = parseInt(days) || 1;
    if (numDays < 1) return;
    if (numDays > 30) {
      toast.warning('Максимальный срок аренды - 30 дней');
      setRentalDays({ ...rentalDays, [consoleId]: 30 });
      return;
    }
    setRentalDays({ ...rentalDays, [consoleId]: numDays });
  };

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toLocaleString() : '0';
  };

  const handleAddToCart = (consoleItem) => {
    console.log('Adding to cart:', consoleItem);
    console.log('Auth status:', { isAuthenticated, user });
    console.log('Auth token:', Cookies.get('authToken'));
    console.log('Current cart items:', cartItems);

    const hasAuthToken = Boolean(Cookies.get('authToken'));
    const isUserAuthenticated = isAuthenticated && hasAuthToken;

    if (!isUserAuthenticated) {
      console.log('User not authenticated, showing auth modal');
      setSelectedConsole(consoleItem);
      setShowAuthModal(true);
      toast.info('Для добавления товара в корзину необходимо авторизоваться');
      return;
    }

    try {
      const days = rentalDays[consoleItem._id] || 1;
      const consoleWithRental = {
        ...consoleItem,
        type: 'console',
        rentalDays: days,
        quantity: 1,
        price: consoleItem.pricePerDay || 0,
        title: consoleItem.title
      };

      const existingItem = cartItems.find(item => 
        item._id === consoleItem._id && item.type === 'console'
      );

      console.log('Dispatching addItem with:', consoleWithRental);
      dispatch(addItem(consoleWithRental));
      
      if (existingItem) {
        toast.success(`Количество "${consoleWithRental.title}" увеличено`);
      } else {
        toast.success(`"${consoleWithRental.title}" добавлена в корзину`);
      }

      console.log('Updated cart items:', cartItems);
    } catch (error) {
      console.error('Ошибка при добавлении в корзину:', error);
      toast.error('Ошибка при добавлении в корзину');
    }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Игровые консоли</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-300" />
            <div className="p-4">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-300 rounded w-full mb-2" />
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-4" />
              <div className="h-10 bg-gray-300 rounded w-full mb-4" />
              <div className="flex justify-between items-center">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-20 mb-1" />
                  <div className="h-6 bg-gray-300 rounded w-24 mb-1" />
                  <div className="h-4 bg-gray-300 rounded w-32 mb-1" />
                  <div className="h-6 bg-gray-300 rounded w-28" />
                </div>
                <div className="h-10 bg-gray-300 rounded w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-600 py-8">
      Ошибка: {error}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Игровые консоли</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(consoles) && consoles.map((consoleItem) => {
          if (!consoleItem) return null;
          
          const days = rentalDays[consoleItem._id] || 1;
          const pricePerDay = consoleItem.pricePerDay || 0;
          const totalPrice = pricePerDay * days;

          return (
            <div key={consoleItem._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative group">
                <img
                  src={consoleItem.imageUrl 
                    ? `${import.meta.env.VITE_API_URL.replace('/api', '')}/api/uploads/${consoleItem.imageUrl}` 
                    : '/placeholder-image.png'
                  }
                  alt={consoleItem.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                  onError={(e) => {
                    console.error('Ошибка загрузки изображения:', e.target.src);
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.png';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
              </div>
              <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">{consoleItem.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{consoleItem.description}</p>
                
                <div className="mt-auto">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Срок аренды (дней):
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={days}
                      onChange={(e) => handleRentalDaysChange(consoleItem._id, e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-gray-600">Цена за день:</p>
                      <p className="text-lg font-bold text-primary">{formatPrice(pricePerDay)} ₸</p>
                      {days > 1 && (
                        <>
                          <p className="text-sm text-gray-600 mt-1">Итого за {days} {days === 1 ? 'день' : 'дней'}:</p>
                          <p className="text-lg font-bold text-blue-600">{formatPrice(totalPrice)} ₸</p>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(consoleItem)}
                      className="btn btn-primary hover:scale-105 transition-transform duration-200"
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AuthCartModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onGuestSubmit={(guestData) => {
          console.log('Guest data:', guestData);
          if (selectedConsole) {
            handleAddToCart(selectedConsole);
          }
        }}
      />
    </div>
  );
}

export default Consoles;