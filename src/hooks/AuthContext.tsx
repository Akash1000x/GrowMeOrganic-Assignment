import * as React from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  authMessage: string;
  setAuthMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(!!window.localStorage.getItem("user"));
  const [authMessage, setAuthMessage] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const user = window.localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, authMessage, setAuthMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
