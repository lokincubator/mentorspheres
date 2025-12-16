// src/components/PublicRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {Navbar} from "../components/layout/Navbar";
import {Footer} from "../components/layout/Footer";

export default function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-700">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
      <div className='flex min-h-screen flex-col bg-white'>
          <Navbar />
          <Outlet />
          <Footer />
      </div>
  );
}
