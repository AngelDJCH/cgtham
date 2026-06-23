import { axiosInstance } from "./Axios"

export const createInscripcion = async (id_evento, id_organizacion) => {
    try {
        const date = new Date()
        const day =  date.getDate()
        const year = date.getFullYear()
        const month = date.getMonth()
        const {status} = await axiosInstance.post('/inscripcionesEvento/', {
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
        const inscripciones = await axiosInstance.get(`/inscripcionesEvento/organizaciones/${id_organizacion}`)
        return inscripciones.data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER TODAS LAS INSCRIPCIONES')
    }
}

export const findAllByIdUsuario = async (id_usuario) => {
    try {
        const { data } = await axiosInstance.get(`/inscripcionesEvento/usuario/${id_usuario}`)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER TODAS LAS INSCRIPCIONES')
    }
}

export const updateInscripcionByEstado = async (id_inscripcion, estado) => {
    try {
        const data_update = {
            estado: estado
        }
        const { status } = await axiosInstance.put(`/inscripcionesEvento/estado/${id_inscripcion}`, data_update)
        return status
    } catch (error) {
        return error.response.status
    }
}

export const findParticipantesByIEvento = async (id_evento) => {
    try {
        const { data } = await axiosInstance.get(`/inscripcionesEvento/participantes/${id_evento}`)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LOS PARTICIPANTES DEL EVENTO')
    }
}

export const findInscripcionesByIdEvento = async (id_evento) => {
    try {
        const { data } = await axiosInstance.get()
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LAS INSCRIPCIONES DEL EVENTO')
    }
}

export const deleteById = async (id_inscripcion) => {
    try {
        const res = await axiosInstance.delete(`/inscripcionesEvento/${id_inscripcion}`)
        return res.status
    } catch (error) {
        return error.response.status
    }
}