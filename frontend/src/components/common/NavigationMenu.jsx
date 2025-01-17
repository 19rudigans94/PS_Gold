import React from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';

export function NavigationMenu({ 
  items, 
  currentPath, 
  onItemClick,
  listProps = {},
  itemProps = {} 
}) {
  return (
    <List {...listProps}>
      {items.map((item) => (
        <ListItem key={item.path} disablePadding {...itemProps}>
          <ListItemButton
            component={Link}
            to={item.path}
            selected={currentPath === item.path}
            onClick={onItemClick}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light'
                }
              },
              ...itemProps.sx
            }}
          >
            {item.icon && (
              <ListItemIcon 
                sx={{ 
                  color: currentPath === item.path ? 'primary.main' : 'inherit',
                  ...itemProps.iconSx
                }}
              >
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText 
              primary={item.label}
              sx={{ 
                color: currentPath === item.path ? 'primary.main' : 'inherit',
                '& .MuiTypography-root': {
                  fontWeight: currentPath === item.path ? 'bold' : 'normal'
                },
                ...itemProps.textSx
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
