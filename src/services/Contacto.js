import { axiosInstance } from "./Axios"

export const getContacto = async (id_contacto) => {
    try {
        const { data } = await axiosInstance.get(`/contactos/${id_contacto}`)
        return data
    } catch (error) {
        console.error('Error al obtener el contacto:', error)
        return null
    }
}

export const createContacto = async (correo, telefono) => {
    try {
        const data = {
            correo: correo,
            telefono: telefono
        }
        const id_contacto = await axiosInstance.post('/contactos/', data)
        return id_contacto.data
    } catch (error) {
        return null
    }
}

export const updateContactoById = async (contacto) => {
    try {
        const contactoData = {
            correo: contacto.correo,
            telefono: contacto.telefono
        }
        const { status } = await axiosInstance.put(`/contactos/${contacto.id}`, contactoData)
        return status
    } catch (error) {
        console.error('Error al actualizar el contacto:', error)
        return error?.response?.status || 500
    }
}

export const deleteContactoById = async (id) => {
    try {
        const { status } = await axiosInstance.delete(`/contactos/${id}`)
        return status
    } catch (error) {
        return error.response.status
    }
}