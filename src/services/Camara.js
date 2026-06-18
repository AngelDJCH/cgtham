import { axiosInstance } from "./Axios"

export const getCamara = async (id_comercio) => {
    try {
        const {data} = await axiosInstance.get(`/camaras/${id_comercio}`)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LA CAMARA DE COMERCIO')
    }
}

export const createCamara = async (id, nombre, presidente) => {
    try {
        const {data} = await axiosInstance.post(`/camaras/`,{
            id : id, 
            nombre : nombre, 
            presidente : presidente
        })
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL CREAR LA CAMARA DE COMERCIO')
    }
}

export const updateCamaraById = async (camara) => {
    try {
        const camaraData = {
            nombre : camara.nombre,
            presidente : camara.presidente
        }

        const {status} = await axiosInstance.put(`/camaras/${camara.id}`, camaraData)
        return status
    } catch (error) {
        return error.response.status
    }
}