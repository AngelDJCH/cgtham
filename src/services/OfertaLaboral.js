import { axiosInstance } from './Axios.js'

export const getOfertasCounts = async () => {
    const { data } = await axiosInstance.get('/ofertaslaborales/count')
    return data.empleos
}

export const getOfertasLaboralesAll = async (limit, offset) => {
    try {
        const { data } = await axiosInstance.get(`/ofertaslaborales/${limit}/${offset}`)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LAS OFERTAS LABORALES')
    }
}

export const getOfertasLaboralesByIdOrganizacion = async (id_organizacion, limit, offset) => {
    try {
        const { data } = await axiosInstance.get(`/ofertaslaborales/organizacion/${id_organizacion}/${limit}/${offset}`)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LAS OFERTAS LABORALES DE LA ORGANIZACION')
    }
}

export const getOfertasLaboralesByIdUsuario = async (id_usuario) => {
    try {
        const { data } = await axiosInstance.get(`/postulaciones/experiencia/${id_usuario}`)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LAS OFERTAS EDUCATIVAS DE LA ORGANIZACION')
    }
}

export const getOfertaById = async (id_oferta) => {
    try {
        const { data } = await axiosInstance.get(`/ofertaslaborales/${id_oferta}`)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LOS DATOS DE LA OFERTA LABORAL')
    }
}

export const createOfertaLaboral = async (oferta) => {
    try {
        const ofertaData = {
            titulo: oferta.titulo,
            descripcion: oferta.descripcion,
            salario: oferta.salario,
            jornada: oferta.jornada,
            tipo_contrato: oferta.tipo_contrato,
            vacantes: oferta.vacantes,
            beneficios: oferta.beneficios,
            habilidades_tecnicas: oferta.habilidades_tecnicas,
            habilidades_blandas: oferta.habilidades_blandas,
            departamento_area: oferta.departamento_area,
            modalidad: oferta.modalidad,
            experiencia: oferta.experiencia,
            estado: 'Activa',
            id_empresa: oferta.id_empresa,
            documento: oferta.documento
        }
        console.log(oferta)

        const { data } = await axiosInstance.post(`/ofertaslaborales`, ofertaData)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL CREAR LA OFERTA LABORAL')
    }
}

export const deleteOferta = async (id) => {
    try {
        const { status } = await axiosInstance.delete(`/ofertaslaborales/${id}`)
        return status
    } catch (error) {
        return error.response.status
    }
}