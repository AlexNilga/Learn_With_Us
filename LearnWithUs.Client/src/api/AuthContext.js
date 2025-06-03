import React, {createContext, useState, useEffect, useMemo} from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({
    role: "Guest",
    login: () => {},
    logout: () => {}
});

const getToken = () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const {exp} = jwtDecode(token);
        return exp * 1000 > Date.now() ? token : null;
    } catch {
        return null;
    }
}

const role = () => {
    try{
        const token = getToken()
        if(!token) return "Guest";
        const decoded = jwtDecode(token);
        console.log(decoded);
    }catch{
        return "Guest";
    }
}

export function AuthProvider({children}) {
    const [token, setToken] = useState(getToken);
    const role = Boolean(token);

    const [isLoggedIn, setIsLoggedIn] = useState(
        () => !!localStorage.getItem("token")
    );

    // keep in sync if another tab changes storage
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "token") {
                setToken(getToken());
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    }

    const value = useMemo(
        () => ({role, login, logout}),
        [isLoggedIn]
    );


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
