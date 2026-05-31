import { axiosInstance } from './Axios.js'

export const getOrganizacionesCounts = async () => {
    const { data } = await axiosInstance.get('/organizaciones/count');
    return data.organizaciones;
}

export const getOrganizacion = async (id_organizacion) => {
    try {
        const { data } = await axiosInstance.get(`/organizaciones/${id_organizacion}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getOrganizacionFast = async (id_organizacion) => {
    try {
        const { data } = await axiosInstance.get(`/organizaciones/fast/${id_organizacion}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getAllOrganizaciones = async () => {
    try {
        const {data} = await axiosInstance.get('/organizaciones/')
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getAllOrganizacionesPendientes = async () => {
    try {
        const {data} = await axiosInstance.get('/organizaciones/pendientes/')
        return data
    } catch (error) {
        console.log(error)
    }
}

export const createOrganizaion = async (nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id_contacto, id_direccion) => {
    try {
        const {data} = await axiosInstance.post(`/organizaciones/`,{
            nombre_comercial : nombre_comercial,
            descripcion : descripcion,
            tipo : tipo,
            sector : sector,
            tamaño : tamaño,
            giro : giro,
            rfc : rfc,
            logo : logo,
            banner : banner,
            id_contacto : id_contacto,
            id_direccion : id_direccion
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateById = async (organizacion) => {
    try {
        const dataOrganizacion = {
            nombre_comercial : organizacion.nombre_comercial,
            descripcion : organizacion.descripcion,
            tipo : organizacion.tipo,
            sector : organizacion.sector,
            tamaño : organizacion.tamaño,
            giro : organizacion.giro,
            rfc : organizacion.rfc
        }
        const {status} = await axiosInstance.put(`/organizaciones/${organizacion.id}`, dataOrganizacion)
        return status
    } catch (error) {
        console.log(error)
    }
}