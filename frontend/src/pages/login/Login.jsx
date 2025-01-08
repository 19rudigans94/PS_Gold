import React from 'react';
import { Container, Box, Paper } from '@mui/material';
import LoginForm from './components/LoginForm';
import LoginHeader from './components/LoginHeader';
import { useLogin } from './hooks/useLogin';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

const Login = () => {
  const { formData, isLoading, error, handleChange, handleSubmit } = useLogin();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <LoginHeader />
          <LoginForm
            formData={formData}
            isLoading={isLoading}
            error={error}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
