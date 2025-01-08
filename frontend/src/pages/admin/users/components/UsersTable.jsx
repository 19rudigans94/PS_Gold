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
  Tooltip,
  Chip,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

const UserRow = ({ user, onStatusChange, onRoleChange, onEdit }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(user.id, newStatus);
    handleMenuClose();
  };

  const handleRoleChange = (newRole) => {
    onRoleChange(user.id, newRole);
    handleMenuClose();
  };

  return (
    <TableRow>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Chip
          label={user.role === 'admin' ? 'Администратор' : 'Пользователь'}
          color={user.role === 'admin' ? 'primary' : 'default'}
        />
      </TableCell>
      <TableCell>
        <Chip
          label={user.status === 'active' ? 'Активен' : 'Заблокирован'}
          color={user.status === 'active' ? 'success' : 'error'}
        />
      </TableCell>
      <TableCell>{new Date(user.registeredAt).toLocaleDateString('ru')}</TableCell>
      <TableCell>{new Date(user.lastLogin).toLocaleDateString('ru')}</TableCell>
      <TableCell>
        <Tooltip title="Редактировать">
          <IconButton onClick={() => onEdit(user)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Действия">
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleStatusChange(user.status === 'active' ? 'blocked' : 'active')}>
            {user.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
          </MenuItem>
          <MenuItem onClick={() => handleRoleChange(user.role === 'admin' ? 'user' : 'admin')}>
            {user.role === 'admin' ? 'Сделать пользователем' : 'Сделать администратором'}
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export const UsersTable = ({
  users,
  onStatusChange,
  onRoleChange,
  onEdit
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Роль</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Дата регистрации</TableCell>
            <TableCell>Последний вход</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onStatusChange={onStatusChange}
              onRoleChange={onRoleChange}
              onEdit={onEdit}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
