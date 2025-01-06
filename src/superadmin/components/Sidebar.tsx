import React, { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Collapse, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import { toggleTheme } from '../../reducer/theme'; // Assuming toggleTheme action exists

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openUser, setOpenUser] = useState(false); // User dropdown state

  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme); // Get the current theme

  // Toggle the sidebar on mobile
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Toggle the "User" dropdown
  const handleUserClick = () => {
    setOpenUser(!openUser);
  };

  // Handle theme change
  const handleThemeToggle = () => {
    dispatch(toggleTheme()); // Dispatch the action to change the theme
  };

  return (
    <Box
      sx={{
        width: {
          xs: isOpen ? 240 : 60, // On small screens, show the full sidebar or collapsed version
          sm: 240, // On medium and up screens, sidebar is always 240px wide
        },
        height: '100%',
        backgroundColor: theme === 'light' ? '#F4F4F4' : '#1E293B', // Theme-dependent background color
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0 20px 20px 0', // Rounded corners
        boxShadow: 2, // Shadow for a more modern look
        transition: 'width 0.3s ease-in-out, background-color 0.3s ease', // Smooth transition for sidebar width and background color
        color: theme === 'light' ? '#333' : 'white', // Theme-dependent text color
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
          borderBottom: '1px solid #4B5563', // Adding a border for separation
        }}
      >
        Super Admin
      </Box>

      <List sx={{ paddingTop: 2 }}>
        {/* Dashboard Item */}
        <ListItemButton sx={{ '&:hover': { backgroundColor: theme === 'light' ? '#E0E0E0' : '#374151' } }}>
          <ListItemIcon sx={{ color: theme === 'light' ? '#333' : 'white' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: theme === 'light' ? '#333' : 'white' }} />
        </ListItemButton>

        {/* User Dropdown */}
        <ListItemButton onClick={handleUserClick} sx={{ '&:hover': { backgroundColor: theme === 'light' ? '#E0E0E0' : '#374151' } }}>
          <ListItemIcon sx={{ color: theme === 'light' ? '#333' : 'white' }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="User" sx={{ color: theme === 'light' ? '#333' : 'white' }} />
          {openUser ? <ArrowDropDownIcon sx={{ color: theme === 'light' ? '#333' : 'white' }} /> : <ArrowRightIcon sx={{ color: theme === 'light' ? '#333' : 'white' }} />}
        </ListItemButton>

        {/* User Dropdown Items */}
        <Collapse in={openUser} timeout="auto" unmountOnExit>
          <Box sx={{ pl: 4 }}>
            <ListItemButton sx={{ '&:hover': { backgroundColor: theme === 'light' ? '#E0E0E0' : '#374151' } }}>
              <ListItemText primary="All Users" sx={{ color: theme === 'light' ? '#333' : 'white' }} />
            </ListItemButton>
            <ListItemButton sx={{ '&:hover': { backgroundColor: theme === 'light' ? '#E0E0E0' : '#374151' } }}>
              <ListItemText primary="Add User" sx={{ color: theme === 'light' ? '#333' : 'white' }} />
            </ListItemButton>
          </Box>
        </Collapse>

        <Divider sx={{ backgroundColor: '#4B5563', my: 2 }} />

      </List>

      {/* Menu icon for mobile */}
      <IconButton
        sx={{
          display: {
            xs: 'block', // Show the menu button on mobile
            sm: 'none', // Hide it on larger screens
          },
          position: 'absolute',
          top: 16,
          left: 16,
          color: theme === 'light' ? '#333' : 'white',
        }}
        onClick={handleToggleSidebar}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default Sidebar;
