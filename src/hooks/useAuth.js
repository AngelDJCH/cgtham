import { useContext } from "react";
import {AuthContex} from '../context/AuthContext.js'

export const useAuth = ()=>{
    const context = useContext(AuthContex)
    if(!context) throw new Error('useAuth debe usarse dentro de un AuthProvider')
    return context
}