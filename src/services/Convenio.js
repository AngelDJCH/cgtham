import { axiosInstance } from "./Axios";

export const getConveniosCounts = async () => {
    const { data } = await axiosInstance.get('/convenios/count')
    return data.convenios;
}

export const createConvenio = async (convenio, document) => {
    try {
        const dataConvenio = {
            titulo: convenio.titulo,
            descripcion: convenio.descripcion,
            tipo: convenio.tipo,
            subtipo: convenio.subtipo,
            estado: true,
            archivo: document,
            fecha_inicio: convenio.fecha_inicio,
            fecha_final: convenio.fecha_final
        }
        const { data } = await axiosInstance.post('/convenios/', dataConvenio)
        return data
    } catch (error) {
        return error.response.status
    }
}

export const findById = async (id_convenio) => {
    try {
        const { data } = await axiosInstance.get(`/convenios/${id_convenio}`)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER EL CONVENIO')
    }
}

export const deleteByIdConvenio = async (id_convenio) => {
    try {
        const { status } = await axiosInstance.delete(`/convenios/${id_convenio}`)
        return status
    } catch (error) {
        return error.response.status
    }
}

export const updateConvenioById = async (id_convenio, convenio) => {
    try {
        const { status } = await axiosInstance.put(`/convenios/${id_convenio}`, convenio)
        return status
    } catch (error) {
        return error.response.status
    }
}

export const getDashConvenios = async () => {
    try {
        const { data } = await axiosInstance.get('/convenios/dash')
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LOS CONVENIOS')
    }
}