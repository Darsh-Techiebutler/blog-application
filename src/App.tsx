import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginPage from './pages/LoginPage';
import { AdminDashboard } from './admin/AdminDashboard';
import { SuperAdminDashboard } from './superadmin/SuperAdminDashboard';

const App = () => {
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null); // Token to check if user is authenticated
  const theme = useSelector((state: any) => state.theme.theme);  // Get theme from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []);

  const handleRoleChange = (newRole: string) => {
    const token = localStorage.getItem('token');
    localStorage.setItem('role', newRole);
    setRole(newRole);

    // Ensure token is still valid (you could have an expiry check here if needed)
    if (token) {
      localStorage.setItem('token', token);
    }
  };

  // Define light and dark themes
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleRoleChange} />} />
          <Route
            path="/admin"
            element={
              token && role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" replace /> // Redirect to login if token is missing or role is invalid
              )
            }
          />
          <Route
            path="/superadmin"
            element={
              token && role === 'superadmin' ? ( // Only allow access if token and role are valid
                <SuperAdminDashboard />
              ) : (
                <Navigate to="/login" replace /> // Redirect to login if token is missing or role is invalid
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
