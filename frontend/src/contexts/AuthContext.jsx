import { createContext, useContext, useState, useEffect } from "react";
import { getProfile, logoutUser, loginUser, registerUser } from "../api/auth.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getProfile();
        if (data && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password)
      if (data && data.user) {
        setUser(data.user);
      }
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await registerUser({ name, email, password });
      if (data && data.user) {
        setUser(data.user);
      }
      return data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; 
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
