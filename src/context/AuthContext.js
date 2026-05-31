import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../services/Axios";

export const AuthContex = createContext()

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const verifyToken = async () => {
            try {
                const res = await axiosInstance.get('/cuentas/verify')
                setUser(res.data)
            } catch (error) {
                setUser(null)
            }finally{
                setLoading(false)
            }
        }

        verifyToken()
    },[])

    return(
        <AuthContex.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContex.Provider>
    )
}