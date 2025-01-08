import React from 'react';
import {
  Box,
  Drawer,
  useTheme,
  useMediaQuery
} from '@mui/material';

const drawerWidth = 240;

export function ResponsiveDrawer({ 
  mobileOpen, 
  handleDrawerToggle, 
  children,
  drawerProps = {} 
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            backgroundColor: 'background.paper',
            ...drawerProps.sx
          }
        }}
      >
        {children}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            backgroundColor: 'background.paper',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            ...drawerProps.sx
          }
        }}
        open
      >
        {children}
      </Drawer>
    </Box>
  );
}

export const DRAWER_WIDTH = drawerWidth;
