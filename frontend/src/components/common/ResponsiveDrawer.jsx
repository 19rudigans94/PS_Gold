import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

export function ResponsiveDrawer({ 
  mobileOpen, 
  handleDrawerToggle, 
  children,
  drawerProps = {} 
}) {
  const theme = useTheme();

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          right: 16,
          top: 16,
          zIndex: theme.zIndex.drawer + 2,
          bgcolor: 'background.paper',
          boxShadow: 1,
          '&:hover': {
            bgcolor: 'background.paper',
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            backgroundColor: 'background.paper',
            borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
            ...drawerProps.sx
          }
        }}
      >
        {children}
      </Drawer>
    </>
  );
}

export const DRAWER_WIDTH = drawerWidth;
