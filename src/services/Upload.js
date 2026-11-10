import axios from "axios"
import { axiosInstance } from "./Axios"

export const uploadImg = async (data_img) => {
    try {
        const res = await axiosInstance.post('/uploadCloudinary/upload', {
            imagen_url: data_img
        })

        return res.data.url
    } catch (error) {
        return null
    }
}

export const uploadImgLogo = async (data_img, id_organizacion) => {
    try {
        const res = await axiosInstance.post(`/uploadCloudinary/upload/logo/`, {
            id_organizacion: id_organizacion,
            imagen_url: data_img
        })
        return res.data.url
    } catch (error) {
        console.error('Error al subir el logo:', error)
        return null
    }
}

export const uploadImgBanner = async (data_img, id_organizacion) => {
    try {
        const res = await axiosInstance.post(`/uploadCloudinary/upload/banner/`, {
            id_organizacion: id_organizacion,
            imagen_url: data_img
        })
        return res.data.url
    } catch (error) {
        console.error('Error al subir el banner:', error)
        return null
    }
}

export const uploadDocument = async (data_img, id_organizacion) => {
    try {
        const res = await axiosInstance.post(`/uploadCloudinary/upload/documento/`, {
            id_organizacion: id_organizacion,
            imagen_url: data_img
        })

        return res.data.url
    } catch (error) {
        console.error('Error al subir el documento:', error)
        return null
    }
}