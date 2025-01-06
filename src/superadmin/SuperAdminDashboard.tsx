import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DataTable from './components/DataTable';
import { Box } from '@mui/material';

const SuperAdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: '240px',
          padding: 3,
          marginTop: '64px',
          backgroundColor: '#f9f9f9',
          height: '100vh',
        }}
      >
        <Header />
        <DataTable />
      </Box>
    </Box>
  );
};

export { SuperAdminDashboard };
