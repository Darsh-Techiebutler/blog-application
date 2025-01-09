import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import { AdminDashboard } from './admin/AdminDashboard';
import { SuperAdminDashboard } from './superadmin/SuperAdminDashboard';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem('token') || '');  // Get token from localStorage on load
  const reduxToken = useSelector((state:any) => state.auth.token);
  const role = useSelector((state:any) => state.auth.role) || localStorage.getItem('role');
  const themeMode = useSelector((state:any) => state.theme.theme);

  useEffect(() => {
    if (reduxToken) {
      setToken(reduxToken);
      localStorage.setItem('token', reduxToken);  // Store token in localStorage
    }
  }, [reduxToken]);

  useEffect(() => {
    dispatch({ type: 'INITIALIZE_AUTH' });  // Initialize auth on app load
  }, [dispatch]);

  const theme = createTheme({
    palette: { mode: themeMode === 'light' ? 'light' : 'dark' },
  });

  return (
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute role="admin" userRole={role} token={token}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* SuperAdmin Routes */}
            <Route
              path="/superadmin/*"
              element={
                <ProtectedRoute role="superadmin" userRole={role} token={token}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Unauthorized Route */}
            <Route path="/unauthorized" element={<div>Unauthorized</div>} />

            {/* Fallback for 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
  );
};

export default App;
