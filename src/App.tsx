import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginPage from './pages/LoginPage';
import { AdminDashboard } from './admin/AdminDashboard';
import { SuperAdminDashboard } from './superadmin/SuperAdminDashboard';
// import { toggleTheme } from './reducer/theme';  // Assuming the theme toggle action is in the theme reducer

const App = () => {
  const [role, setRole] = useState<string | null>(null);
  const theme = useSelector((state: any) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const handleRoleChange = (newRole: string) => {
    localStorage.setItem('role', newRole);
    setRole(newRole);
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
              role === 'admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/superadmin"
            element={
              role === 'superadmin' ? (
                <SuperAdminDashboard />
              ) : (
                <Navigate to="/login" replace />
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
