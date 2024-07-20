import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth-context";

export default function ProtectedRoute() {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) return <Navigate to="/create-account" />
    return <Outlet/>
}