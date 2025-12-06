"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const USER_ROLES = {
    READER: "reader",
    EDITOR: "editor",
};

const APPLICATION_STATUS_KEY = "editorApplicationStatus";

const initialUsers = [
    { 
        username: "test", 
        email: "test@example.com", 
        password: "test", 
        favorites: [], 
        role: USER_ROLES.EDITOR 
    },
    { 
        username: "reader1", 
        email: "reader@example.com", 
        password: "pass", 
        favorites: [], 
        role: USER_ROLES.READER
    },
];

const AuthContext = createContext();

const getRoleFromStorage = (user) => {
    const appStatus = localStorage.getItem(`${APPLICATION_STATUS_KEY}_${user.username}`);
    if (appStatus === 'approved') {
        return USER_ROLES.EDITOR;
    }
    return user.role || USER_ROLES.READER;
};


export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(initialUsers);
    const [currentUser, setCurrentUser] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        const storedData = localStorage.getItem("stationAuthData");
        if (storedData) {
            try {
                const { users: loadedUsers, currentUser: loadedCurrentUser } = JSON.parse(storedData);
                
                const normalizedUsers = loadedUsers ? loadedUsers.map(u => ({ 
                    ...u, 
                    role: u.role || USER_ROLES.READER 
                })) : initialUsers;

                setUsers(normalizedUsers);
                
                if (loadedCurrentUser) {
                    const finalRole = getRoleFromStorage(loadedCurrentUser);
                    setCurrentUser({ 
                        ...loadedCurrentUser,
                        role: finalRole 
                    });
                } else {
                    setCurrentUser(null);
                }

            } catch (e) {
                console.error("Failed to parse auth data from localStorage", e);
            }
        }
    }, []);

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
            
            const finalRole = getRoleFromStorage(user);

            const userWithUpdatedRole = { 
                ...user,
                role: finalRole 
            };
            
            setCurrentUser(userWithUpdatedRole);
            return true;
        }
        return false;
    };

    const register = (username, email, password) => {
        if (users.some(u => u.username === username || u.email === email)) return false;
        
        const newUser = { 
            username, 
            email, 
            password, 
            favorites: [], 
            role: USER_ROLES.READER 
        };
        
        setUsers(prevUsers => [...prevUsers, newUser]);
        setCurrentUser(newUser);
        return true;
    };

    const logout = () => setCurrentUser(null);

    const isEditor = () => {
        return !!currentUser && currentUser.role === USER_ROLES.EDITOR;
    };

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
                    ? { ...u, favorites: newFavorites, role: u.role } 
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
                ? { ...u, favorites: newFavorites, role: u.role } 
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
                isEditor, 
                addFavorite,
                removeFavorite,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);