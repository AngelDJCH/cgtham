import { axiosInstance } from "./Axios"

export const getCamara = async (id_comercio) => {
    try {
        const { data } = await axiosInstance.get(`/camaras/${id_comercio}`)
        return data
    } catch (error) {
        console.error('Error al obtener la cámara de comercio:', error)
        return null
    }
}

export const createCamara = async (id, nombre, presidente) => {
    try {
        const { data } = await axiosInstance.post(`/camaras/`, {
            id: id,
            nombre: nombre,
            presidente: presidente
        })
        return data
    } catch (error) {
        return null
    }
}

export const updateCamaraById = async (camara) => {
    try {
        const camaraData = {
            nombre: camara.nombre,
            presidente: camara.presidente
        }
        const { status } = await axiosInstance.put(`/camaras/${camara.id}`, camaraData)
        return status
    } catch (error) {
        return error.response.status
    }
}