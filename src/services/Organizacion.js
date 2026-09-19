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
        alert('OCURRIO UN ERROR AL OBTENER LA ORGANIZACION')
    }
}

export const getOrganizacionFast = async (id_organizacion) => {
    try {
        const { data } = await axiosInstance.get(`/organizaciones/fast/${id_organizacion}`)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LA ORGANIZACION')
    }
}

export const getAllOrganizaciones = async () => {
    try {
        const { data } = await axiosInstance.get('/organizaciones/')
        return data
    } catch (error) {
    }
}

export const getAllOrganizacionesPendientes = async () => {
    try {
        const { data } = await axiosInstance.get('/organizaciones/pendientes/')
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LAS ORGANIZACIONES PENDIENTES')
    }
}

export const createOrganizaion = async (nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id_contacto, id_direccion) => {
    try {
        const { data } = await axiosInstance.post(`/organizaciones/`, {
            nombre_comercial: nombre_comercial,
            descripcion: descripcion,
            tipo: tipo,
            sector: sector,
            tamaño: tamaño,
            giro: giro,
            rfc: rfc,
            logo: logo,
            banner: banner,
            id_contacto: id_contacto,
            id_direccion: id_direccion
        })
        return data
    } catch (error) {
        return null
    }
}

export const updateById = async (organizacion) => {
    try {
        const dataOrganizacion = {
            nombre_comercial: organizacion.nombre_comercial,
            descripcion: organizacion.descripcion,
            tipo: organizacion.tipo,
            sector: organizacion.sector,
            tamaño: organizacion.tamaño,
            giro: organizacion.giro,
            rfc: organizacion.rfc
        }
        const { status } = await axiosInstance.put(`/organizaciones/${organizacion.id}`, dataOrganizacion)
        return status
    } catch (error) {
        return error.response.status
    }
}

export const updateEstadoByIdOrganizacion = async (id, estado) => {
    try {
        const { data } = await axiosInstance.put(`/organizaciones/estado/${id}`, { estado: estado })
        return data
    } catch (error) {
        alert('OUCRRIO UN ERROR AL ACTUALIZAR EL ESTADO DE LA ORGANIZACION')
    }
}


export const getLogoByIdOrganizacion = async (id) => {
    try {
        const { data } = await axiosInstance.get(`/organizaciones/logo/${id}`)
        return data.logo
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER EL LOGO DE LA ORGANIZACION')
    }
}

export const deleteOrganizacionById = async (id) => {
    try {
        const { status } = await axiosInstance.delete(`/organizaciones/${id}`)
        return status
    } catch (error) {
        return error.response.status
    }
}