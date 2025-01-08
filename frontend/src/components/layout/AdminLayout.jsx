import React, { Suspense, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Logo } from '../ui/Logo';
import { Box, Toolbar } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  ShoppingCart as OrdersIcon,
  Games as CatalogIcon,
  VpnKey as KeysIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { ResponsiveDrawer, DRAWER_WIDTH } from '../common/ResponsiveDrawer';
import { NavigationMenu } from '../common/NavigationMenu';
import { PageHeader } from '../common/PageHeader';

function AdminLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Панель управления', icon: <DashboardIcon /> },
    { path: '/admin/users', label: 'Пользователи', icon: <UsersIcon /> },
    { path: '/admin/orders', label: 'Заказы', icon: <OrdersIcon /> },
    { path: '/admin/catalog', label: 'Каталог', icon: <CatalogIcon /> },
    { path: '/admin/game-keys', label: 'Ключи', icon: <KeysIcon /> },
    { path: '/admin/settings', label: 'Настройки', icon: <SettingsIcon /> }
  ];

  const drawer = (
    <>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Logo />
        </Link>
      </Toolbar>
      <NavigationMenu
        items={menuItems}
        currentPath={location.pathname}
        onItemClick={() => setMobileOpen(false)}
      />
    </>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <PageHeader
        title="Админ панель"
        onMenuClick={handleDrawerToggle}
        sx={{
          display: { md: 'none' },
          width: '100%'
        }}
      />

      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      >
        {drawer}
      </ResponsiveDrawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: 7, md: 0 },
          backgroundColor: 'background.default'
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
}

export default AdminLayout;
