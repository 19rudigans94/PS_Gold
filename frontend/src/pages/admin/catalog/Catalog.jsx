import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { GamesTable } from './components/GamesTable';
import { GameForm } from './components/GameForm';
import { useCatalog } from './hooks/useCatalog';

const Catalog = () => {
  const {
    games,
    loading,
    openDialog,
    selectedGame,
    page,
    rowsPerPage,
    formData,
    handleChangePage,
    handleChangeRowsPerPage,
    handleOpenDialog,
    handleCloseDialog,
    handleInputChange,
    handleSubmit,
    handleDelete
  } = useCatalog();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Каталог игр
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Добавить игру
        </Button>
      </Box>

      <GamesTable
        games={games}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
      />

      <GameForm
        open={openDialog}
        onClose={handleCloseDialog}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        selectedGame={selectedGame}
      />
    </Container>
  );
};

export default Catalog;
