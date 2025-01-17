import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Container, Grid } from '@mui/material';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { fetchGames, setPage, setFilters } from '../../store/slices/gamesSlice';
import GameCard from './components/GameCard';
import GamesFilter from './components/GamesFilter';
import Pagination from '@mui/material/Pagination';

function Games() {
  const dispatch = useDispatch();
  const { 
    games = [], 
    isLoading, 
    error,
    filters,
    pagination: { page, limit, total }
  } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGames({ page, limit, filters }));
  }, [dispatch, page, limit, filters]);

  const handlePageChange = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container>
        <Box textAlign="center" py={4}>
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box py={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Каталог игр
        </Typography>

        <GamesFilter filters={filters} onFilterChange={handleFilterChange} />

        <Grid container spacing={3} mt={2}>
          {games?.map((game) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
              <GameCard game={game} />
            </Grid>
          ))}
          {games.length === 0 && !isLoading && (
            <Grid item xs={12}>
              <Typography textAlign="center" color="text.secondary">
                Игры не найдены
              </Typography>
            </Grid>
          )}
        </Grid>

        {total > limit && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Math.ceil(total / limit)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Games;
