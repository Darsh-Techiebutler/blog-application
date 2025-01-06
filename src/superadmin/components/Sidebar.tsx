import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';  // Import Link for navigation
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
// import UsersList from './UsersList';

const Sidebar = ({ onUserClick }: { onUserClick: () => void }) => {  // Pass user click handler as prop
  const [openUser, setOpenUser] = useState(false);
  const token = useSelector((state: any) => state.auth.token); // Get the token from Redux or localStorage

  const handleUserClick = () => {
    setOpenUser(!openUser);
    onUserClick();  // Call passed handler on click
  };

  return (
    <Box
      sx={{
        width: 240,
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
          fontSize: 18,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Super Admin
      </Box>

      <List>
        <ListItemButton component={Link} to="/admin"> {/* Use Link for navigation */}
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={handleUserClick}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="User" />
          {openUser ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </ListItemButton>

        <Collapse in={openUser} timeout="auto" unmountOnExit>
          <Box sx={{ pl: 4 }}>
            <ListItemButton component={Link} to="/superadmin/users">
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="All Users" />
            </ListItemButton>
            <ListItemButton component={Link} to="/admin/add-user">
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Add User" />
            </ListItemButton>
          </Box>
        </Collapse>
      </List>

      <IconButton
        sx={{
          display: 'block', // Show the menu button on mobile
          position: 'absolute',
          top: 16,
          left: 16,
        }}
        onClick={() => {}}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default Sidebar;
