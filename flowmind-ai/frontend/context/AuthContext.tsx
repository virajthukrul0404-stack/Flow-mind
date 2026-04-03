"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Read initial state on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("flowmind_auth") === "true";
    setIsLoggedIn(authStatus);
  }, []);

  const login = () => {
    localStorage.setItem("flowmind_auth", "true");
    setIsLoggedIn(true);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("flowmind_auth");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
