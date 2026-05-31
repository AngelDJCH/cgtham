import { axiosInstance } from './Axios.js'

export const eventoOrganizacion = async (limit, offset) => {
    const {data} = await axiosInstance.get(`/eventos/organizacion/${limit}/${offset}`)
    return data
}

export const eventosByIdOrganizacion = async (id_organizacion) => {
    try {
        const {data} = await axiosInstance.get(`/eventos/organizacion/${id_organizacion}`)
        return data
    } catch (error) {
        console.log(error)
    }
}
