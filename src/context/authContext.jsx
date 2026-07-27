import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { getCurrentUser } from '../features/admin/auth/api/auth.api';


export const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const checkAuth = async () => {
        setIsCheckingAuth(true);

        try {
            const response = await getCurrentUser();
            setUser(response.data?.user || response.data || null);
        } catch (error) {
            if (error.response?.status !== 401) {
                console.error(error);
            }
            setUser(null);
        } finally {
            setIsCheckingAuth(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);
    const value = {
        user,
        setUser,
        isCheckingAuth,
        checkAuth,
    };

    return (

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthProvider