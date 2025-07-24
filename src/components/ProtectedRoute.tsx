
import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
 const isAuthenticated = Boolean(
  localStorage.getItem("token") || sessionStorage.getItem("token")
);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

