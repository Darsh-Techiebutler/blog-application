import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { toggleTheme } from '../../reducer/theme';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../reducer/authReducer'; // Import logout action

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  const navigate = useNavigate();

  // Correcting the path to access user data
  const userinfo = useSelector((state: any) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by verifying localStorage and reset the user info if not available
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!user || !token) {
      dispatch(logout()); // Clear user state if no user or token is found
    }
  }, [dispatch]);

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget); // Set the anchor element to the clicked avatar
    setOpenMenu(!openMenu); // Toggle the menu visibility
  };

  const handleCloseMenu = () => {
    setOpenMenu(false); // Close the menu when it loses focus
  };

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
    console.log('Logging out...');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setOpenMenu(false); // Close the menu after logout
    navigate('/login'); // Redirect to login
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Super Admin Dashboard
        </Typography>
        <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
          {userinfo && userinfo.name ? (
            <>
              <Avatar
                alt={userinfo.name}
                src={userinfo.avatarUrl || '/static/images/avatar/1.jpg'}
                onClick={handleAvatarClick}
                sx={{ cursor: 'pointer' }}
              />
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Box sx={{ minWidth: 200 }}>
                  {/* Display user info: email and role */}
                  <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="body2">{userinfo.email}</Typography>
                    <Typography variant="body2" color="textSecondary">{userinfo.role}</Typography>
                  </MenuItem>

                  {/* Logout icon */}
                  <MenuItem onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center' }}>
                    <LogoutIcon sx={{ mr: 1 }} /> {/* Logout Icon */}
                    Logout
                  </MenuItem>
                </Box>
              </Menu>
            </>
          ) : (
            <Avatar
              alt="User Avatar"
              src="/static/images/avatar/1.jpg"
              onClick={handleAvatarClick} // Open menu on click
              sx={{ cursor: 'pointer' }}
            />
          )}
        </Box>
        <Tooltip title="Toggle light/dark theme">
          <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
            {theme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
