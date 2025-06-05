import React, {createContext, useState, useEffect, useMemo} from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({
    role: String,
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    // getId: () => {}
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

// const getId = () => {
//     try {
//         const token = getToken();
//         if (!token) return null;
//         const {id} = jwtDecode(token);
//         console.log(id);
//         return id
//     } catch {
//         return null;
//     }
// }

const getRole = () => {
    try{
        const token = getToken()
        const decoded = jwtDecode(token);
        return decoded.role || "Guest";
    }catch{
        return "Guest";
    }
}

export function AuthProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
    console.log("Logged in: ", isLoggedIn)
    const [role, setRole] = useState(getRole);

    useEffect(() => {
        function handleStorageChange() {
            setIsLoggedIn(!!getToken());
            setRole(getRole);
        }

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setRole(getRole)
        setIsLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem("token");
        setRole(getRole)
        setIsLoggedIn(false);
    }

    const value = useMemo(
        () => ({role, isLoggedIn, login, logout}),
        [role, isLoggedIn]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
