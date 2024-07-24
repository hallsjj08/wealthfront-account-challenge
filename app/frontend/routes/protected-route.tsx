import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../store/useAuthContext';

export default function ProtectedRoute() {
  const { user } = useAuthContext();

  if (user === null) return null;

  return !user ? <Navigate to="/create-account" /> : <Outlet />;
}
