import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { ModuleCard } from './components/ModuleCard';
import { StatsCharts } from './components/StatsCharts';
import { useDashboard } from './hooks/useDashboard';

const Dashboard = () => {
  const {
    stats,
    loading,
    error,
    adminModules,
    refreshStats
  } = useDashboard();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          Панель управления
        </Typography>
        <Tooltip title="Обновить статистику">
          <IconButton onClick={refreshStats} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {adminModules.map((module, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ModuleCard module={module} />
          </Grid>
        ))}
      </Grid>

      <StatsCharts stats={stats} />
    </Container>
  );
};

export default Dashboard;
