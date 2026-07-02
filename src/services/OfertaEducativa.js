import { axiosInstance } from "./Axios"

export const findAllByIdEscuela = async (id_escuela) => {
    try {
        const { data } = await axiosInstance.get(`/ofertaseducativas/${id_escuela}`)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER TODAS LAS OFERTAS EDUCATIVAS')
    }
}

export const createOfertaEducativa = async (oferta) => {
    try {
        const { status } = await axiosInstance.post('/ofertaseducativas/', {
            nombre: oferta.nombre,
            descripcion: oferta.descripcion,
            duracion: oferta.duracion,
            perfil: oferta.perfil,
            id_escuela: oferta.id_escuela
        })
        return status
    } catch (error) {
        return error.response.status
    }
}