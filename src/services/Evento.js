import axios from "axios";
import { axiosInstance } from "./Axios";

export const createEvento = async (evento) => {
    try {
        const dataEvento = {
            titulo: evento.titulo,
            descripcion: evento.descripcion,
            tipo: evento.tipo,
            estado: 'ACTIVO',
            id_organizacion: evento.id_organizacion,
            fecha_inicio: evento.fecha_inicio,
            fecha_final: evento.fecha_final
        }
        const { data } = await axiosInstance.post('/eventos/', dataEvento)
        return data
    } catch (error) {
        console.error('Error al crear un evento:', error)
        return null
    }
}

export const getEventosCounts = async () => {
    const { data } = await axiosInstance.get('/eventos/count')
    return data.eventos
}

export const getAllEventos = async () => {
    const { data } = await axiosInstance.get('/eventos/')
    return data
}

export const eventosLandingPage = async () => {
    const { data } = await axiosInstance.get('/eventos/');
    return data;
}

export const eventosByIdUsuario = async (id_usuario) => {
    const { data } = await axiosInstance.get(`/eventos/usuario/${id_usuario}`)
    return data
}


export const eventoById = async (id_evento) => {
    try {
        const { data } = await axiosInstance.get(`/eventos/${id_evento}`)
        return data
    } catch (error) {
        console.error('Error al obtener un evento:', error)
        return null
    }
}

export const updateEventoById = async (evento) => {
    try {
        const dataEvento = {
            titulo: evento.titulo,
            descripcion: evento.descripcion,
            tipo: evento.tipo,
            fecha_inicio: evento.fecha_inicio.split('T')[0],
            fecha_final: evento.fecha_final.split('T')[0]
        }
        const { status } = await axiosInstance.put(`/eventos/${evento.id}`, dataEvento)
        return status
    } catch (error) {
        return error.response.status
    }
}

export const deleteEventoById = async (id_evento) => {
    try {
        const res = await axiosInstance.delete(`/eventos/${id_evento}`)
        return res
    } catch (error) {
        console.error('Error al eliminar el evento:', error)
        return null
    }
}

export const findParticipantesPendientesByIdEvento = async (id_evento) => {
    try {
        const { data } = await axiosInstance.get(`/inscripcionesEvento/pendientes/${id_evento}`)
        return data
    } catch (error) {
        return null
    }
}

export const getDashEventos = async () => {
    try {
        const { data } = await axiosInstance.get('/eventos/dash')
        return data
    } catch (error) {
        console.error('Error al obtener los eventos de dashboard:', error)
        return []
    }
}