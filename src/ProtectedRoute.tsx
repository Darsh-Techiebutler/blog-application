import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ role, userRole, token, children }: any) {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (!(token || storedToken) || !(userRole === role || storedRole === role)) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
