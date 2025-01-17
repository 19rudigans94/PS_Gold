import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { OrderFilters } from './components/OrderFilters';
import { OrdersTable } from './components/OrdersTable';
import { OrderPagination } from './components/OrderPagination';
import { useOrders } from './hooks/useOrders';

const Orders = () => {
  const {
    orders,
    loading,
    searchTerm,
    selectedStatus,
    dateRange,
    currentPage,
    totalPages,
    handleSearch,
    handleStatusChange,
    handleDateRangeChange,
    handlePageChange,
    updateOrderStatus
  } = useOrders();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Управление заказами
      </Typography>

      <OrderFilters
        searchTerm={searchTerm}
        selectedStatus={selectedStatus}
        dateRange={dateRange}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onDateRangeChange={handleDateRangeChange}
      />

      <OrdersTable
        orders={orders}
        onStatusChange={updateOrderStatus}
      />

      <OrderPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default Orders;
