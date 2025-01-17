import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { UserFilters } from './components/UserFilters';
import { UsersTable } from './components/UsersTable';
import { UserForm } from './components/UserForm';
import { UserPagination } from './components/UserPagination';
import { useUsers } from './hooks/useUsers';

const Users = () => {
  const {
    users,
    loading,
    searchTerm,
    selectedRole,
    currentPage,
    totalPages,
    openDialog,
    selectedUser,
    handleSearch,
    handleRoleChange,
    handlePageChange,
    handleOpenDialog,
    handleCloseDialog,
    updateUserStatus,
    updateUserRole
  } = useUsers();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Управление пользователями
      </Typography>

      <UserFilters
        searchTerm={searchTerm}
        selectedRole={selectedRole}
        onSearch={handleSearch}
        onRoleChange={handleRoleChange}
      />

      <UsersTable
        users={users}
        onStatusChange={updateUserStatus}
        onRoleChange={updateUserRole}
        onEdit={handleOpenDialog}
      />

      <UserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <UserForm
        open={openDialog}
        onClose={handleCloseDialog}
        user={selectedUser}
        onSubmit={handleCloseDialog}
      />
    </Container>
  );
};

export default Users;
