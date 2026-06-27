import { axiosInstance } from "./Axios"

export const getContacto = async (id_contacto) => {
    try {
        console.log(id_contacto)
        const {data} = await axiosInstance.get(`/contactos/${id_contacto}`)
        console.log(data)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER EL CONTACTO')
    }
}

export const createContacto = async (correo, telefono) => {
    try {
        const data = {
            correo : correo,
            telefono : telefono
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
            correo : contacto.correo,
            telefono : contacto.telefono
        }

        const {status} = await axiosInstance.put(`/contactos/${contacto.id}`, contactoData)
        return status
    } catch (error) {
        alert('OCURRIO UN ERROR AL ACTUALIZAR EL CONTACTO')
    }
}

export const deleteContactoById = async (id) => {
    try {
        const {status} = await axiosInstance.delete(`/contactos/${id}`)
        return status
    } catch (error) {
        return error.response.status
    }
}