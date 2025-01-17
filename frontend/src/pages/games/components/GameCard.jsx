import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Chip
} from '@mui/material';
import { addToCart } from '../../../store/slices/cartSlice';

function GameCard({ game }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(game));
  };

  const discountedPrice = game.price * (1 - (game.discount || 0) / 100);

  const imageUrl = game.imageUrl 
    ? new URL(game.imageUrl, import.meta.env.VITE_API_URL).toString()
    : '/placeholder.png';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={game.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {game.title}
        </Typography>

        <Box display="flex" gap={1} mb={1} flexWrap="wrap">
          {game.platforms?.map((platform) => (
            <Chip
              key={platform}
              label={platform}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" mt="auto">
          <Box>
            {game.discount > 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                {game.price} ₸
              </Typography>
            )}
            <Typography variant="h6" color="primary" fontWeight="bold">
              {Math.round(discountedPrice)} ₸
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            size="small"
          >
            В корзину
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default GameCard;
