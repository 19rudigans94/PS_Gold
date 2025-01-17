import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import { Footer } from '../ui/Footer';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Box, Container } from '@mui/material';

function MainLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Navbar />
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          px: { xs: 2, sm: 4 },
          mt: { xs: 2, sm: 4 }
        }}
        maxWidth="lg"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </Container>
      <Footer />
    </Box>
  );
}

export default MainLayout;
