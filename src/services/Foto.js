import { axiosInstance } from "./Axios"

export const getFotosByIdEvento = async (id_evento) => {
    try {
        const {data} = await axiosInstance.get(`/fotos/${id_evento}`)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LAS FOTOS DEL EVENTO')
    }
}

export const uploadFotoEvento = async (data_img, id_evento, id_organizacion) => {
    try {
        const {data} = await axiosInstance.post(`/uploadCloudinary/upload/foto/`, {
            id_evento : id_evento,
            imagen_url : data_img,
            id_organizacion : id_organizacion
        })
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR SUBIR LAS FOTO DEL EVENTO')
    }
}