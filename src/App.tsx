import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { AdminDashboard } from './admin/AdminDashboard';
import { SuperAdminDashboard } from './superadmin/SuperAdminDashboard';

const App = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const handleRoleChange = (newRole: string) => {
    localStorage.setItem('role', newRole);
    setRole(newRole);
  };

  return (
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
  );
};

export default App;
