import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Grid,
  Divider
} from '@mui/material';
import {
  People as UsersIcon,
  ShoppingCart as OrdersIcon,
  Games as CatalogIcon,
  VpnKey as KeysIcon
} from '@mui/icons-material';

const getIcon = (iconName) => {
  switch (iconName) {
    case 'users':
      return <UsersIcon sx={{ fontSize: 40 }} />;
    case 'orders':
      return <OrdersIcon sx={{ fontSize: 40 }} />;
    case 'catalog':
      return <CatalogIcon sx={{ fontSize: 40 }} />;
    case 'keys':
      return <KeysIcon sx={{ fontSize: 40 }} />;
    default:
      return null;
  }
};

export const ModuleCard = ({ module }) => {
  const { title, description, icon, path, color, stats } = module;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          boxShadow: 6
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          background: color,
          opacity: 0.1,
          borderRadius: '0 0 0 100%'
        }}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ color: color, mr: 2 }}>
            {getIcon(icon)}
          </Box>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          {stats.map((stat, index) => (
            <Grid item xs={4} key={index}>
              <Typography variant="h6" component="div" sx={{ color }}>
                {stat.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {stat.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>

      <CardActions>
        <Button
          component={Link}
          to={path}
          size="small"
          color="primary"
          sx={{ ml: 'auto' }}
        >
          Перейти
        </Button>
      </CardActions>
    </Card>
  );
};
