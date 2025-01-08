import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Collapse
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';

const OrderRow = ({ order, onStatusChange }) => {
  const [open, setOpen] = React.useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Завершен';
      case 'pending':
        return 'В обработке';
      case 'cancelled':
        return 'Отменен';
      default:
        return status;
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell>{order.user.name}</TableCell>
        <TableCell>{order.user.email}</TableCell>
        <TableCell>{new Date(order.createdAt).toLocaleString('ru')}</TableCell>
        <TableCell>
          <Chip
            label={getStatusLabel(order.status)}
            color={getStatusColor(order.status)}
            onClick={() => onStatusChange(order.id, order.status)}
          />
        </TableCell>
        <TableCell>{order.total.toFixed(2)} ₽</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Детали заказа
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Игра</TableCell>
                    <TableCell>Ключ</TableCell>
                    <TableCell>Цена</TableCell>
                    <TableCell>Количество</TableCell>
                    <TableCell>Сумма</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.game.title}</TableCell>
                      <TableCell>{item.key}</TableCell>
                      <TableCell>{item.game.price.toFixed(2)} ₽</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{(item.game.price * item.quantity).toFixed(2)} ₽</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const OrdersTable = ({ orders, onStatusChange }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Сумма</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onStatusChange={onStatusChange}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
