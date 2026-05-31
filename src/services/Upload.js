import axios from "axios"
import { axiosInstance } from "./Axios"

export const uploadImg = async (data_img) => {
    try {
        const res = await axios.post('http://localhost:80/api/v1/uploadCloudinary/upload', {
            imagen_url : data_img
        })

        return res.data.url
    } catch (error) {
        console.log(error)
    }
}

export const uploadImgLogo = async (data_img, id_organizacion) => {
    try {
        const res = await axiosInstance.post(`/uploadCloudinary/upload/logo/`, {
            id_organizacion : id_organizacion,
            imagen_url : data_img
        })
        return res.data.url
    } catch (error) {
        console.log(error)
    }
}

export const uploadImgBanner = async (data_img, id_organizacion) => {
    try {
        const res = await axiosInstance.post(`/uploadCloudinary/upload/banner/`, {
            id_organizacion : id_organizacion,
            imagen_url : data_img
        })
        return res.data.url
    } catch (error) {
        console.log(error)
    }
}

export const uploadDocument = async (data_img, id_organizacion) => {
    try {
        const res = await axiosInstance.post(`/uploadCloudinary/upload/documento/`,{
            id_organizacion : id_organizacion,
            imagen_url : data_img
        })

        return res.data.url
    } catch (error) {
        
    }
}