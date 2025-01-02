import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Container, Typography, Box } from '@mui/material';

function AuthLayout({ children, title, subtitle }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        py: 12,
        px: 2,
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: 'text.secondary',
                textAlign: 'center',
              }}
            >
              {subtitle}
            </Typography>
          )}
          {children}
        </Paper>
      </Container>
    </Box>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default AuthLayout;
