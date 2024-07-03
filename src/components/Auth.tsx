import React from "react";
import { Navigate } from "react-router-dom";

export default function Auth({ element }: { element: React.ReactNode }) {
  const user = window.localStorage.getItem("user");
  return user ? element : <Navigate to="/Sign-in" />;
}
