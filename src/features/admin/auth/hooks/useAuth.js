import { adminLogin , adminLogout} from "../api/auth.api";
import { useState } from "react";   
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export const useAuth = () => {
   const { user, setUser, isCheckingAuth, checkAuth } =
  useContext(AuthContext);

    const [loginLoading, setLoginLoading] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogin = async (data) => {
        setLoginLoading(true)
        try {
            const response = await adminLogin(data)
            setUser(response.data.user)
            console.log(response)
            return response
        } finally {
            setLoginLoading(false)
        }
    }
    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
           const response = await adminLogout()
            setUser(null)
            return response
        }finally {
            setIsLoggingOut(false)
        }
    }

    return {
        user,
        
        isCheckingAuth,
        checkAuth,
        loginLoading,
        handleLogin,
        handleLogout,
        isLoggingOut
    }
}