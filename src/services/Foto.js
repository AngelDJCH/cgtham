import { axiosInstance } from "./Axios"

export const getFotosByIdEvento = async (id_evento) => {
    try {
        const { data } = await axiosInstance.get(`/fotos/${id_evento}`)
        return data
    } catch (error) {
        console.error('Error al obtener las fotos del evento:', error)
        return []
    }
}

export const uploadFotoEvento = async (data_img, id_evento, id_organizacion) => {
    try {
        const { data } = await axiosInstance.post(`/uploadCloudinary/upload/foto/`, {
            id_evento: id_evento,
            imagen_url: data_img,
            id_organizacion: id_organizacion
        })
        return data
    } catch (error) {
        console.error('Error al subir la foto del evento:', error)
        return null
    }
}

export const deleteFotoById = async (id_foto) => {
    try {
        const { status } = await axiosInstance.delete(`/fotos/${id_foto}`)
        return status === 204
    } catch (error) {
        const msg = error.response?.data?.message || 'Ocurrió un error al eliminar la fotografía'
        console.error('Error al eliminar foto:', msg)
        return false
    }
}
