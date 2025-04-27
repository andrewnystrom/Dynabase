import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }: { children: React.JSX.Element }) {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}
