// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {Navbar} from "../components/layout/Navbar";
import {Footer} from "../components/layout/Footer";

export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return (
        <div className='flex min-h-screen flex-col bg-white'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}
