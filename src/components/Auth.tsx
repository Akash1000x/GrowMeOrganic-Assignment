import React from "react";
import { Navigate } from "react-router-dom";

//Better way to do this by using context API but for now i created this normally.
export default function Auth({ element }: { element: React.ReactNode }) {
  const user = window.localStorage.getItem("user");
  return user ? element : <Navigate to="/Sign-in" />;
}
