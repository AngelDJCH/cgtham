import axios from "axios";
import { axiosInstance } from "./Axios";
import { data } from "react-router-dom";

export const getComentarios = async (cantidad) => {
    const { data } = await axiosInstance.get('/comentarios/public')
    return data
}

export const findAllComentariosByAdministrador = async () => {
    try {
        const { data } = await axiosInstance.get('/comentarios/')
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateComentarioByEstado = async (id_comentario, estado, id_administrador) => {
    try {
        const data_update = {
            estado: estado,
            id_administrador: id_administrador
        }

        const { status } = await axiosInstance.put(`/comentarios/estado/${id_comentario}`, data_update)
        return status
    } catch (error) {
        console.log(error)
    }
}

export const createComentario = async (contenido, id_usuario) => {
    try {
        const dataComentario = {
            contenido : contenido,
            estado : 'Pendiente',
            id_usuario : id_usuario
        }

        const {status} = await axiosInstance.post('/comentarios/', dataComentario)
        return status
    } catch (error) {
        console.log(error)
        return error.response.status
    }
}

export const findAllComentariosByUsuario = async (id_organizacion) => {
    try {
        const {data} = await axiosInstance.get(`/comentarios/organizacion/${id_organizacion}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteComentarioById = async (id_comentario) => {
    try {
        const res = await axiosInstance.delete(`/comentarios/${id_comentario}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getComentarioById = async (id_comentario) => {
    try {
        const {data} = await axiosInstance.get(`/comentarios/${id_comentario}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateById = async (id_comentario, contenido) => {
    try {
        const res = await axiosInstance.put(`/comentarios/contenido/${id_comentario}`,{contenido : contenido})
        return res
    } catch (error) {
        console.log(error)
    }
}