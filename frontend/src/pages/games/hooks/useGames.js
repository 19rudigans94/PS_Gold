import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames, setFilters, setPage } from '../../../store/slices/gamesSlice';
import { useDebounce } from '../../../hooks/useDebounce';
import { toast } from 'react-toastify';

export const useGames = () => {
  const dispatch = useDispatch();
  const { games, isLoading, error, filters, pagination } = useSelector((state) => state.games);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const loadGames = useCallback((params = {}) => {
    const queryParams = {
      page: pagination.page,
      limit: pagination.limit,
      filters: {
        ...filters,
        ...params
      }
    };
    dispatch(fetchGames(queryParams))
      .unwrap()
      .catch(error => {
        toast.error(error || 'Ошибка при загрузке игр');
      });
  }, [dispatch, filters, pagination.page, pagination.limit]);

  useEffect(() => {
    dispatch(setFilters({ search: debouncedSearch }));
    loadGames({ search: debouncedSearch });
  }, [dispatch, loadGames, debouncedSearch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));
    dispatch(setPage(1));
    loadGames({ [filterType]: value, page: 1 });
  };

  const handleSortChange = (sortBy) => {
    dispatch(setFilters({ sortBy }));
    dispatch(setPage(1));
    loadGames({ sortBy, page: 1 });
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
    loadGames({ page: newPage });
  };

  return {
    games,
    isLoading,
    error,
    filters,
    pagination,
    searchTerm,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    refresh: loadGames
  };
};
