import { axiosInstance } from "./Axios"

export const findAll = async () => {
    try {
        const { data } = await axiosInstance.get('/convenios')
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LOS DATOS DEL CONVENIO')
    }
}

export const createConvenioOrganizacion = async (rol, id_convenio, id_organizacion) => {
    try {
        const data = {
            rol: rol,
            id_convenio: id_convenio,
            id_organizacion: id_organizacion
        }
        const { status } = await axiosInstance.post('/conveniosOrganizaciones/', data)
        return status
    } catch (error) {
        return error.response.status
    }
}

export const findAllParticipantes = async (id_convenio) => {
    try {
        const { data } = await axiosInstance.get(`/conveniosOrganizaciones/participantes/${id_convenio}`)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LOS PARTICIPANTES')
    }
}

export const deleteById = async (id_convenio_organizacion) => {
    try {
        const { status } = await axiosInstance.delete(`/conveniosOrganizaciones/${id_convenio_organizacion}`)
        return status
    } catch (error) {
        return error.response.status
    }
}

export const updateEstadoById = async (id_convenio_organizacion) => {
    try {
        const { status } = await axiosInstance.put(`/conveniosOrganizaciones/estado/${id_convenio_organizacion}`, { estado: true })
        return status
    } catch (error) {
        return error.response.status
    }
}