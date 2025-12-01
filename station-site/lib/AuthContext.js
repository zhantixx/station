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

    // Эффект для загрузки данных при монтировании
    useEffect(() => {
        setMounted(true);
        
        const storedData = localStorage.getItem("stationAuthData");
        if (storedData) {
            try {
                const { users: loadedUsers, currentUser: loadedCurrentUser } = JSON.parse(storedData);
                setUsers(loadedUsers || initialUsers);
                setCurrentUser(loadedCurrentUser || null);
            } catch (e) {
                console.error("Failed to parse auth data from localStorage", e);
            }
        }
    }, []);

    // Эффект для сохранения данных при изменении users или currentUser
    useEffect(() => {
        if (!mounted) return;

        const authData = {
            users,
            currentUser,
        };
        localStorage.setItem("stationAuthData", JSON.stringify(authData));

    }, [users, currentUser, mounted]);

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
        
        setUsers(prevUsers => [...prevUsers, newUser]);
        setCurrentUser(newUser);
        return true;
    };

    const logout = () => setCurrentUser(null);

    const addFavorite = (article) => {
        if (!currentUser) return;
        const exists = currentUser.favorites?.some(f => f.id === article.id);
        
        if (!exists) {
            const newFavorites = [...(currentUser.favorites || []), article];

            setCurrentUser(prevUser => ({
                ...prevUser,
                favorites: newFavorites,
            }));

            setUsers(prevUsers => prevUsers.map(u => 
                u.username === currentUser.username 
                    ? { ...u, favorites: newFavorites } 
                    : u
            ));
        }
    };

    const removeFavorite = (articleId) => {
        if (!currentUser) return;

        const newFavorites = currentUser.favorites.filter(f => f.id !== articleId);

        setCurrentUser(prevUser => ({
            ...prevUser,
            favorites: newFavorites,
        }));
        
        setUsers(prevUsers => prevUsers.map(u => 
            u.username === currentUser.username 
                ? { ...u, favorites: newFavorites } 
                : u
        ));
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