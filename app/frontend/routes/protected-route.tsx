import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/useAuth";

export default function ProtectedRoute() {
    const {user} = useAuth();

    if (user === null) return null

    return (!user ? <Navigate to="/create-account" /> : <Outlet/>)
}