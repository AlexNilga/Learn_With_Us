import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});

export function AuthProvider({ children }) {
    // initialize from localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => !!localStorage.getItem("token")
    );

    // keep in sync if another tab changes storage
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "token") {
                setIsLoggedIn(!!e.newValue);
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
