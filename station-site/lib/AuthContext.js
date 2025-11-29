"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const initialUsers = [
  { username: "test", email: "test@example.com", password: "test", favorites: [] },
];

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("stationUser");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (mounted) {
      if (currentUser) {
        localStorage.setItem("stationUser", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("stationUser");
      }
    }
  }, [currentUser, mounted]);


  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser({ ...user });
      return true;
    }
    return false;
  };

  const register = (username, email, password) => {
    if (users.some(u => u.username === username || u.email === email)) return false;
    const newUser = { username, email, password, favorites: [] };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => setCurrentUser(null);

  const addFavorite = (article) => {
    if (!currentUser) return;
    const exists = currentUser.favorites?.some(f => f.id === article.id);
    if (!exists) {
      setCurrentUser({
        ...currentUser,
        favorites: [...(currentUser.favorites || []), article],
      });
    }
  };

  const removeFavorite = (articleId) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      favorites: currentUser.favorites.filter(f => f.id !== articleId),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        mounted,
        login,
        register,
        logout,
        isAuthenticated: !!currentUser,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
