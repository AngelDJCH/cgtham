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

export const createCuenta = async (correo, contrasenia, id_organizacion) => {
    try {
        const data = {
            correo : correo,
            contrasenia : contrasenia,
            id_organizacion : id_organizacion
        }
        const resCuenta = await axiosInstance.post('/cuentas/', data)
        return resCuenta
    } catch (error) {
        return null
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