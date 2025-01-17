import React from "react";
import { Link } from "react-router-dom";
import GameCard from "../../../pages/games/components/GameCard";
import { Grid, Typography, Box } from "@mui/material";

function FeaturedGames({ games }) {
  if (!games?.length) {
    return null;
  }

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Популярные игры
      </Typography>
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item key={game.id} xs={12} sm={6} md={4} lg={3}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Link
          to="/games"
          style={{ textDecoration: 'none' }}
        >
          <Typography 
            color="primary"
            sx={{ 
              '&:hover': { 
                textDecoration: 'underline' 
              } 
            }}
          >
            Смотреть все игры
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default FeaturedGames;
