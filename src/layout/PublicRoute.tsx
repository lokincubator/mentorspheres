// src/components/PublicRoute.tsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {Navbar} from "../components/layout/Navbar";
import {Footer} from "../components/layout/Footer";

export default function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
      <div className='flex min-h-screen flex-col bg-white'>
          <Navbar />
          <Outlet />
          <Footer />
      </div>
  );
}
