import React, { useState } from 'react';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, ListItemButton, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Toggle the sidebar on mobile
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      sx={{
        width: {
          xs: isOpen ? 220 : 60,   // On small screens, show the full sidebar or collapsed version
          sm: 240,  // On medium and up screens, sidebar is always 220px wide
        },
        height: '100%',
        backgroundColor: '#f4f4f4',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease-in-out',
      }}
    >
      <Box
        sx={{
          padding: 2,
          fontWeight: 'bold',
          fontSize: {
            xs: 12, 
            sm: 18,
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Super Admin
      </Box>

      <List>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        {/* Add more items here */}
      </List>

      {/* Menu icon for mobile */}
      <IconButton
        sx={{
          display: {
            xs: 'block',  // Show the menu button on mobile
            sm: 'none',   // Hide it on larger screens
          },
          position: 'absolute',
          top: 16,
          left: 16,
        }}
        onClick={handleToggleSidebar}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default Sidebar;
