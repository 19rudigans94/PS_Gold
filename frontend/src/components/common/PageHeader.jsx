import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

export function PageHeader({ 
  title, 
  onMenuClick,
  showMenuButton = true,
  children,
  ...props 
}) {
  return (
    <AppBar position="fixed" {...props}>
      <Toolbar>
        {showMenuButton && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
}
