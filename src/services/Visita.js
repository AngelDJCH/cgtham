import { data } from "react-router-dom"
import { axiosInstance } from "./Axios"

export const createVisita = async (id_escuela, id_empresa) => {
    try {
        const {status} = await axiosInstance.post('/visitas/', {
            id_escuela : id_escuela,
            id_empresa : id_empresa
        })
        return status
    } catch (error) {
        console.log(error)
    }
}


export const deleteByIdForEscuelas = async (id_visita) => {
    try {
        const {status} = await axiosInstance.delete(`/visitas/${id_visita}`)
        return status
    } catch (error) {
        console.log(error)
    }
}

export const allVisitasByIdEscuela = async (id_escuela) => {
    try {
        const {data} = await axiosInstance.get(`/visitas/escuela/${id_escuela}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const allVisitasByIdEmpresa = async (id_empresa) => {
    try {
        const {data} = await axiosInstance.get(`/visitas/empresa/${id_empresa}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateEstadoRechazadaById = async (id_visita) => {
    try {
        const {status} = await axiosInstance.put(`/visitas/estado/${id_visita}`)
        return status
    } catch (error) {
        console.log(error)
    }
}

export const findById = async (id_visita) => {
    try {
        const {data} = await axiosInstance.get(`/visitas/${id_visita}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateVisitaById = async (fecha_visita, id) => {
    try {
        const {status} = await axiosInstance.put(`/visitas/${id}`, {fecha_visita : fecha_visita})
        return status
    } catch (error) {
        console.log(error)
    }
}