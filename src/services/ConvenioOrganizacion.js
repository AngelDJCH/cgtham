import { axiosInstance } from "./Axios"

export const findAll = async () => {
    try {
        const { data } = await axiosInstance.get('/convenios')
        return data
    } catch (error) {
        console.log(error)
    }
}

export const createConvenioOrganizacion = async (rol, id_convenio, id_organizacion) => {
    try {
        const data = {
            rol: rol,
            id_convenio: id_convenio,
            id_organizacion: id_organizacion
        }
        const res = await axiosInstance.post('/conveniosOrganizaciones/', data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const findAllParticipantes = async (id_convenio) => {
    try {
        const { data } = await axiosInstance.get(`/conveniosOrganizaciones/participantes/${id_convenio}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteById = async (id_convenio_organizacion) => {
    try {
        const { status } = await axiosInstance.delete(`/conveniosOrganizaciones/${id_convenio_organizacion}`)
        return status
    } catch (error) {
        console.log(error)
    }
}

export const updateEstadoById = async (id_convenio_organizacion) => {
    try {
        const { status } = await axiosInstance.put(`/conveniosOrganizaciones/estado/${id_convenio_organizacion}`, { estado: true })
        return status
    } catch (error) {
        console.log(error)
    }
}