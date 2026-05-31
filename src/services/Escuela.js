import { axiosInstance } from "./Axios"

export const getEscuela = async (id_escuela) => {
    try {
        const {data} = await axiosInstance.get(`/escuelas/${id_escuela}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const createEscuela = async (id_organizacion, tipo_institucion, url_sitio) => {
    try {
        const {data} = axiosInstance.post(`/escuelas/`, {
            id_organizacion : id_organizacion, 
            tipo_institucion : tipo_institucion, 
            url_sitio : url_sitio
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateEscuelaById = async (escuela) => {
    try {
        const escuelaData = {
            tipo_institucion : escuela.tipo_institucion,
            url_sitio : escuela.url_sitio
        }
        const {status} = await axiosInstance.put(`/escuelas/${escuela.id}`, escuelaData)
        return status
    } catch (error) {
        console.log(error)   
    }
}