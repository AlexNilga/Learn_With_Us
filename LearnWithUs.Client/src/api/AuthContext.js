import React, {createContext, useState, useEffect, useMemo, useCallback} from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({
    isLoggedIn: false,
    role: String,
    loginContext: () => {},
    logoutContext: () => {},
    getId: () => {}
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

const getId = () => {
    try {
        const token = getToken();
        if (!token) return null;
        const {id} = jwtDecode(token);
        console.log(id);
        return id
    } catch {
        return null;
    }
}

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
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!getToken());
    const [role, setRole] = useState(() => getRole());

    const refreshAuthState = useCallback(() => {
        setIsLoggedIn(!!getToken());
        setRole(getRole());
    }, []);

    useEffect(() => {
        window.addEventListener("storage", refreshAuthState);
        return () => window.removeEventListener("storage", refreshAuthState);
    }, [refreshAuthState]);


    const loginContext = useCallback((newToken) => {
        localStorage.setItem("token", newToken);
        refreshAuthState();
    }, [refreshAuthState]);


    const logoutContext = useCallback(() => {
        localStorage.removeItem("token");
        refreshAuthState();
    }, [refreshAuthState]);


    const contextValue = useMemo(
        () => ({ isLoggedIn, role, loginContext: loginContext, logoutContext: logoutContext, getId }),
        [isLoggedIn, role, loginContext, logoutContext, getId]
    );


    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}