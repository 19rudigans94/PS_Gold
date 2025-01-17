import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  TablePagination,
  Tooltip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'error';
    case 'draft':
      return 'warning';
    default:
      return 'default';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'active':
      return 'Активна';
    case 'inactive':
      return 'Неактивна';
    case 'draft':
      return 'Черновик';
    default:
      return status;
  }
};

export const GamesTable = ({
  games,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete
}) => {
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, games.length - page * rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Жанр</TableCell>
              <TableCell>Платформа</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((game) => (
                <TableRow key={game.id}>
                  <TableCell>{game.title}</TableCell>
                  <TableCell>{game.price ? `${game.price} ₽` : 'Не указана'}</TableCell>
                  <TableCell>{game.genre || 'Не указан'}</TableCell>
                  <TableCell>{game.platform || 'Не указана'}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(game.status)}
                      color={getStatusColor(game.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Редактировать">
                      <IconButton onClick={() => onEdit(game)} size="small">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <IconButton onClick={() => onDelete(game.id)} size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={games.length}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Строк на странице:"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}-${to} из ${count !== -1 ? count : `более чем ${to}`}`
        }
      />
    </>
  );
};
