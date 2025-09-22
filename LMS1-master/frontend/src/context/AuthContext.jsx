import React, { createContext, useContext, useState } from "react";

// Create Context
const AuthContext = createContext();

// Custom Hook
export function useAuth() {
  return useContext(AuthContext);
}

// Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Login: expects a user object from backend { name, role, email, ... }
  function login(userData) {
    setUser(userData);
  }

  // Logout
  function logout() {
    setUser(null);
  }

  const value = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
