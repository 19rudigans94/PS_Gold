import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchGames } from '../store/slices/productsSlice';
import { addItem } from '../store/slices/cartSlice';
import AuthCartModal from '../components/modals/AuthCartModal';
import Cookies from 'js-cookie';

function Games() {
  const dispatch = useDispatch();
  const { games, loading, error } = useSelector(state => state.products);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const cartItems = useSelector(state => state.cart.items);
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    dispatch(fetchGames()).then(action => {
      if (action.payload) {
        console.log('Loaded games:', action.payload);
      }
    });
  }, [dispatch]);

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toLocaleString() : '0';
  };

  const handleAddToCart = (game) => {
    console.log('Adding to cart:', game);
    console.log('Auth status:', { isAuthenticated, user });
    console.log('Auth token:', Cookies.get('authToken'));
    console.log('Current cart items:', cartItems);

    const hasAuthToken = Boolean(Cookies.get('authToken'));
    const isUserAuthenticated = isAuthenticated && hasAuthToken;

    if (!isUserAuthenticated) {
      console.log('User not authenticated, showing auth modal');
      setSelectedGame(game);
      setShowAuthModal(true);
      toast.info('Для добавления товара в корзину необходимо авторизоваться');
      return;
    }

    try {
      const existingItem = cartItems.find(item => 
        item.id === game.id && item.type === 'game'
      );

      console.log('Existing item in cart:', existingItem);

      const gameToAdd = {
        ...game,
        type: 'game',
        price: game.price || 0,
        quantity: 1
      };

      console.log('Dispatching addItem with:', gameToAdd);
      dispatch(addItem(gameToAdd));
      
      if (existingItem) {
        toast.success(`Количество "${game.title}" увеличено`);
      } else {
        toast.success(`"${game.title}" добавлена в корзину`);
      }

      console.log('Updated cart items:', cartItems);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Ошибка при добавлении в корзину');
    }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Игры</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={`skeleton-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-300" />
            <div className="p-4">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-300 rounded w-full mb-2" />
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-4" />
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-300 rounded w-1/4" />
                <div className="h-10 bg-gray-300 rounded w-1/3" />
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
      <h2 className="text-2xl font-bold mb-6">Игры</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(games) && games.map((game) => {
          if (!game) return null;
          
          const price = game.price || 0;
          
          return (
            <div key={game.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative aspect-w-16 aspect-h-9">
                <img 
                  src={game.imageUrl ? `${import.meta.env.VITE_API_URL}/${game.imageUrl}` : '/placeholder-image.png'} 
                  alt={game.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.png';
                  }}
                />
              </div>
              <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">{game.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{game.description}</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">{formatPrice(price)} ₸</span>
                  <button
                    onClick={() => handleAddToCart(game)}
                    className="btn btn-primary hover:scale-105 transition-transform duration-200"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AuthCartModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}

export default Games;