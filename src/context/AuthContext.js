import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../services/Axios";

export const AuthContex = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const {data} = await axiosInstance.get('/cuentas/verify')
                setUser(data)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        verifyToken()
    }, [])

    return (
        <AuthContex.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContex.Provider>
    )
}