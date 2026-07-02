import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export const ProtectedRoute = ({ children, redirectTo, roles, tipo }) => {
    const { user, loading } = useAuth()
    if (loading) return <p>Cargando</p>
    if (!user) return <Navigate to={redirectTo}></Navigate>
    //if(user.rol.includes(rols)) return <Navigate to={redirectTo}></Navigate>
    if (roles) {
        const result = user.rol.map(r => r).filter(rf => roles.includes(rf))
        console.log(result)
        if (result.length === 0) return <Navigate to={redirectTo}></Navigate>
        if (tipo) {
            const res = user.tipo != tipo
            if (!res) return <Navigate to={redirectTo}></Navigate>
        }
    }

    return children ? children : <Outlet />;
}