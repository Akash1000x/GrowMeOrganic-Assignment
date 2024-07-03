import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import { Container } from "@mui/material";
import "./App.css";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/Sign-in" element={<SignIn />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        </Routes>
      </Container>
    </AuthProvider>
  );
}
