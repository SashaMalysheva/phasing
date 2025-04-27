import React, { createContext, useContext, useState, useEffect } from "react";
import { loginSite } from "@/lib/api";

type User = {
  id: string;
  name: string;
  number: number;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Автоматически логиним как Site 0
        const response = await loginSite(0);
        const userData = {
          id: response.id,
          name: response.name,
          number: 0
        };
        setUser(userData);
        localStorage.setItem("uberTrialUser", JSON.stringify(userData));
      } catch (e) {
        console.error("Failed to initialize user", e);
        setError(e instanceof Error ? e.message : "Failed to initialize user");
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("uberTrialUser");
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
