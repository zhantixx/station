// AuthContext.js
"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const initialUsers = [
  { username: "test", email: "test@example.com", password: "test" },
];

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('stationUser');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentUser) {
        localStorage.setItem('stationUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('stationUser');
      }
    }
  }, [currentUser]);

  const login = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      const userData = { username: user.username, email: user.email };
      setCurrentUser(userData); 
      return true;
    }
    return false;
  };

  const register = (username, email, password) => {
    if (users.some((u) => u.username === username || u.email === email)) {
      return false; 
    }
    const newUser = { username, email, password };
    setUsers([...users, newUser]);
    const userData = { username: newUser.username, email: newUser.email };
    setCurrentUser(userData);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};