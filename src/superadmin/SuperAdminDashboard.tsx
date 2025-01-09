import React from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import UsersList from './components/users/UsersList';
import { AddUser } from './components/users/AddUser'; // Example: Add User component

const SuperAdminDashboard = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box>
      <Header />
      <Grid container>
        {/* Static Sidebar */}
        <Grid item xs={isMobile ? 2 : 3} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Sidebar />
        </Grid>

        {/* Main Content Area */}
        <Grid
          item
          xs={12}
          sm={9}
          md={10}
          sx={{
            marginLeft: isMobile ? 0 : '240px', // Adjust left margin for desktop
            padding: 2,
            marginTop: '64px', // Ensure it aligns below the header
            // height: '100vh',
          }}
        >
          <Box sx={{ marginTop: 2 }}>
            <Routes>
              <Route path="/users" element={<UsersList />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/users/:id" element={<AddUser />} />
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export { SuperAdminDashboard };
