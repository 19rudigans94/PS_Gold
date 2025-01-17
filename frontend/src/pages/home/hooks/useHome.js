import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../../../store/slices/gamesSlice';

export const useHome = () => {
  const dispatch = useDispatch();
  const { games, isLoading, error } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGames({ page: 1, limit: 12 }));
  }, [dispatch]);

  const featuredGames = Array.isArray(games) 
    ? games.filter(game => game.featured).slice(0, 4)
    : [];

  return {
    featuredGames,
    isLoading,
    error
  };
};
