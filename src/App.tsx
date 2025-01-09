  import React, { useEffect, useState } from 'react';
  import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  import { useDispatch, useSelector } from 'react-redux';
  import { PersistGate } from 'redux-persist/integration/react';
  import { ThemeProvider, createTheme } from '@mui/material/styles';
  import LoginPage from './pages/LoginPage';
  import ProtectedRoute from './ProtectedRoute';
  import NotFoundPage from './pages/NotFoundPage';
  import { AdminDashboard } from './admin/AdminDashboard';
  import { SuperAdminDashboard } from './superadmin/SuperAdminDashboard';
  import { ToastContainer } from 'react-toastify'; // Import ToastContainer
  import { persistor } from './store/store';  // import the store and persistor

  const App = () => {
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const reduxToken = useSelector((state: any) => state.auth.token);
    useEffect(() => {
      if (reduxToken) {
        setToken(reduxToken);
        localStorage.setItem('token', reduxToken);
      }
    }, [reduxToken]);
    // console.log("redux token", token);
    const role = useSelector((state: any) => state.auth.role) || localStorage.getItem('role');
    const themeMode = useSelector((state: any) => state.theme.theme);

    useEffect(() => {
      dispatch({ type: 'INITIALIZE_AUTH' });
    }, [dispatch]);

    const theme = createTheme({
      palette: { mode: themeMode === 'light' ? 'light' : 'dark' },
    });

    return (

      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>

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
        </PersistGate>
      </ThemeProvider>
    );
  };

  export default App;
