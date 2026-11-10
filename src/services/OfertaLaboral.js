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
        console.error('Error al obtener las ofertas laborales:', error)
        return []
    }
}

export const getOfertasLaboralesByIdOrganizacion = async (id_organizacion, limit, offset) => {
    try {
        const { data } = await axiosInstance.get(`/ofertaslaborales/organizacion/${id_organizacion}/${limit}/${offset}`)
        return data
    } catch (error) {
        console.error('Error al obtener las ofertas laborales de la organización:', error)
        return []
    }
}

export const getOfertasLaboralesByIdUsuario = async (id_usuario) => {
    try {
        const { data } = await axiosInstance.get(`/postulaciones/experiencia/${id_usuario}`)
        return data
    } catch (error) {
        console.error('Error al obtener las ofertas por usuario:', error)
        return []
    }
}

export const getOfertaById = async (id_oferta) => {
    try {
        const { data } = await axiosInstance.get(`/ofertaslaborales/${id_oferta}`)
        return data
    } catch (error) {
        console.error('Error al obtener los datos de la oferta laboral:', error)
        return null
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
        console.error('Error al crear la oferta laboral:', error)
        return null
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