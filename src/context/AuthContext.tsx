
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserRole, loginSponsor, loginSite } from "@/lib/api";

type UserRole = "sponsor" | "site" | null;

type User = {
  id: string;
  name: string;
  role: UserRole;
  number: number;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (role: UserRole, number: number) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem("uberTrialUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
        localStorage.removeItem("uberTrialUser");
      }
    }
    setLoading(false);
  }, []);

  const login = async (role: UserRole, number: number) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (role === "sponsor") {
        if (number < 0 || number > 2) {
          throw new Error("Sponsor number must be between 0 and 2");
        }
        response = await loginSponsor(number);
      } else if (role === "site") {
        if (number < 0 || number > 9) {
          throw new Error("Site number must be between 0 and 9");
        }
        response = await loginSite(number);
      } else {
        throw new Error("Invalid role selected");
      }
      
      const userData = {
        id: response.id,
        name: response.name,
        role: role,
        number: number
      };
      
      setUser(userData);
      localStorage.setItem("uberTrialUser", JSON.stringify(userData));
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : "Incorrect code, please try again");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("uberTrialUser");
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
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
