import React from 'react';
import GameCard from '../../../components/GameCard';
import { Box, Typography, Pagination as MuiPagination } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const GamesList = ({ games, pagination, onPageChange }) => {
  if (!games.length) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 6
        }}
      >
        <SentimentDissatisfiedIcon
          sx={{
            fontSize: 48,
            color: 'text.secondary',
            mb: 2
          }}
        />
        <Typography variant="h6" color="text.primary" gutterBottom>
          Игры не найдены
        </Typography>
        <Typography color="text.secondary">
          Попробуйте изменить параметры поиска
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)'
          },
          gap: 3,
          mb: 4
        }}
      >
        {games.map((game) => (
          <Box
            key={game.id}
            sx={{
              transform: 'translateY(0)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)'
              }
            }}
          >
            <GameCard game={game} />
          </Box>
        ))}
      </Box>

      {pagination && pagination.totalPages > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 4
          }}
        >
          <MuiPagination
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default GamesList;
