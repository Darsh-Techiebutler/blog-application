import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        backgroundColor: '#f4f4f4',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ padding: 2, fontWeight: 'bold', fontSize: 18 }}>Super Admin</Box>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        {/* Add more items here */}
      </List>
    </Box>
  );
};

export default Sidebar;
