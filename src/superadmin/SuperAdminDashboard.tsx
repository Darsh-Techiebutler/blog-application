import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Box, Grid, useMediaQuery } from '@mui/material';
import UsersList from './components/UsersList';

const SuperAdminDashboard = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [showUsersList, setShowUsersList] = useState(false);

  const handleUserClick = () => {
    setShowUsersList(!showUsersList); // Toggle the UsersList display
  };

  return (
    <Grid container>
      <Grid item xs={isMobile ? 2 : 3} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Sidebar onUserClick={handleUserClick} />
      </Grid>

      {/* Main Content */}
      <Grid
        item
        xs={12} sm={9} md={10}
        sx={{
          marginLeft: isMobile ? 0 : '240px',  // Adjust left margin based on screen size
          padding: 2,
          marginTop: '64px',
          backgroundColor: '#f9f9f9',
          height: '100vh',
        }}
      >
        <Header />
        <UsersList token={''} />
      </Grid>
    </Grid>
  );
};

export { SuperAdminDashboard };
