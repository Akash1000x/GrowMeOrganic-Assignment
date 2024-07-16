import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated, setAuthMessage } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      setAuthMessage("You must enter your details before accessing Home page.");
    } else {
      setAuthMessage("");
    }
  }, [isAuthenticated, setAuthMessage]);

  if (!isAuthenticated) {
    return <Navigate to="/Sign-in" />;
  }

  return <Outlet />;
}
