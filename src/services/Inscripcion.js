import { axiosInstance } from "./Axios"

export const createInscripcion = async (id_evento, id_organizacion) => {
    try {
        const date = new Date()
        const day =  date.getDate()
        const year = date.getFullYear()
        const month = date.getMonth()
        const {status} = await axiosInstance.post('/inscripciones/', {
            estado: 'PENDIENTE',
            fecha: `${year}-${month < 10 ? '0'+month : month}-${day < 10 ? '0'+day : day}`,
            id_evento: id_evento,
            id_organizacion: id_organizacion
        })
        return status
    } catch (error) {
        return error.response.status
    }
}

export const findAllInscripciones = async (id_organizacion) => {
    try {
        const inscripciones = await axiosInstance.get(`/inscripciones/organizaciones/${id_organizacion}`)
        return inscripciones.data
    } catch (error) {
        console.log(error)
    }
}

export const findAllByIdUsuario = async (id_usuario) => {
    try {
        const { data } = await axiosInstance.get(`/inscripciones/usuario/${id_usuario}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateInscripcionByEstado = async (id_inscripcion, estado) => {
    try {
        const data_update = {
            estado: estado
        }
        const { status } = await axiosInstance.put(`/inscripciones/estado/${id_inscripcion}`, data_update)
        return status
    } catch (error) {
        console.log(error)
    }
}

export const findParticipantesByIEvento = async (id_evento) => {
    try {
        const { data } = await axiosInstance.get(`/inscripciones/participantes/${id_evento}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const findInscripcionesByIdEvento = async (id_evento) => {
    try {
        const { data } = await axiosInstance.get()
    } catch (error) {
        console.log(error)
    }
}

export const deleteById = async (id_inscripcion) => {
    try {
        const res = await axiosInstance.delete(`/inscripciones/${id_inscripcion}`)
        return res.status
    } catch (error) {
        console.log(error)
    }
}