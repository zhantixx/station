"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    setMounted(true);

    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setCurrentUser(data.user);
          } else {
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Ошибка при проверке сессии:", error);
        setCurrentUser(null);
      } finally {
        setLoadingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  const register = async (username, email, password) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка регистрации");
      }

      setCurrentUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка входа");
      }

      setCurrentUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message || "Ошибка сети" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    } finally {
      setCurrentUser(null);
    }
  };

  const addFavorite = async (articleId) => {
    if (!currentUser) return false;

    try {
      const res = await fetch("/api/user/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId: String(articleId) }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCurrentUser((prev) => ({
          ...prev,
          favoriteIds: data.favorites,
        }));
        return true;
      } else {
        console.error("Ошибка от сервера:", data.message);
        alert("Не удалось добавить в избранное.");
        return false;
      }
    } catch (error) {
      console.error("Ошибка добавления в избранное:", error);
      alert("Произошла ошибка сети.");
      return false;
    }
  };

  const removeFavorite = async (articleId) => {
    if (!currentUser) return false;

    try {
      const res = await fetch("/api/user/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId: String(articleId) }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCurrentUser((prev) => ({
          ...prev,
          favoriteIds: data.favorites,
        }));
        return true;
      } else {
        console.error("Ошибка от сервера:", data.message);
        alert("Не удалось удалить из избранного.");
        return false;
      }
    } catch (error) {
      console.error("Ошибка удаления из избранного:", error);
      alert("Произошла ошибка сети.");
      return false;
    }
  };

  const isEditor = () => currentUser?.role === "editor";

  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        mounted,
        loadingAuth,
        isAuthenticated,
        isEditor,              
        login,
        register,
        logout,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
};