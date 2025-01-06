import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginPage from './pages/LoginPage';
import { AdminDashboard } from './admin/AdminDashboard';
import { SuperAdminDashboard } from './superadmin/SuperAdminDashboard';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const theme = useSelector((state: any) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
    }
  }, []); // Only runs once on component mount


  // const handleRoleChange = (newRole: string) => {
  //   const token = localStorage.getItem('token');
  //   localStorage.setItem('role', newRole);
  //   setRole(newRole);

  //   if (token) {
  //     localStorage.setItem('token', token);
  //   }
  // };

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
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin" userRole={role} token={token}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin"
            element={
              <ProtectedRoute role="superadmin" userRole={role} token={token}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
