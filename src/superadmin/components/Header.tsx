import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, IconButton, Tooltip, Menu, MenuItem, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { toggleTheme } from '../../reducer/theme';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  const navigate = useNavigate();

  // Correcting the path to access user data
  const userinfo = useSelector((state: any) => state.auth.user);
  console.log(userinfo);

  // State for managing avatar menu visibility
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Super Admin Dashboard
        </Typography>

        <Box display="flex" alignItems="center">
          <Tooltip title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={() => dispatch(toggleTheme())} color="inherit" sx={{ mr: 2 }}>
              {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>

          {/* Display User's Avatar or Name */}
          <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
            {userinfo && userinfo.name ? (
              <>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  {userinfo.name}
                </Typography>
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
                    <MenuItem disabled>
                      <Typography variant="h6">{userinfo.name}</Typography>
                    </MenuItem>
                    <MenuItem disabled>{userinfo.email}</MenuItem>
                    <MenuItem disabled>{`Role: ${userinfo.role}`}</MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
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
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
      >
        <MenuItem disabled>
          <Typography variant="body2">{userinfo?.name}</Typography>
        </MenuItem>
        <MenuItem disabled>
          <Typography variant="body2">{userinfo?.role}</Typography>
        </MenuItem>
        <MenuItem disabled>
          <Typography variant="body2">{userinfo?.email}</Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
