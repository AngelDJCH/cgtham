import axios from "axios"
import { axiosInstance } from "./Axios.js"

export const login = async (correo, contraseña) => {
    const data = {
        correo: correo,
        contrasenia: contraseña
    }
    const respuesta = axiosInstance.post('/cuentas/login', data)
    return respuesta
}

export const logout = async () => {
    try {
        const res = await axiosInstance.post('/cuentas/logout')
        console.log(res)
        return res.status
    } catch (error) {
        return error.response.status
    }
}

export const createCuenta = async (correo, contrasenia, roles, id_organizacion) => {
    try {
        const data = {
            correo : correo,
            contrasenia : contrasenia,
            roles : roles,
            id_organizacion : id_organizacion
        }
        const resCuenta = await axiosInstance.post('/cuentas/', data)
        return resCuenta ? resCuenta : alert('ERROR AL CREAR LA ORGANIZACION')
    } catch (error) {
        alert('OCURRIO UN ERROR AL CREAR LA CUENTA')
    }
}

export const updateCuentaCorreoById = async (cuenta) => {
    try {
        const cuentaData = {
            correo : cuenta.correo,
        }
        const {status} = await axiosInstance.put(`/cuentas/correo/${cuenta.id}`, cuentaData)
        return status
    } catch (error) {
        return error.response.status
    }
}

export const updateCuentaContraseniaById = async (cuenta) => {
    try {
        const cuentaData = {
            contrasenia : cuenta.contrasenia
        }
        const {status} = await axiosInstance.put(`/cuentas/contrasenia/${cuenta.id}`, cuentaData)
        return status
    } catch (error) {
        return error.response.status
    }
}