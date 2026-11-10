import { axiosInstance } from "./Axios"

export const getDireccion = async (id_direccion) => {
    try {
        const { data } = await axiosInstance.get(`/direcciones/${id_direccion}`)
        return data
    } catch (error) {
        console.error('Error al obtener la dirección:', error)
        return null
    }
}

export const createDireccion = async (
    calle, numero, colonia, codigo_postal, ciudad, estado, pais
) => {
    try {
        const data = {
            calle: calle,
            numero: numero,
            colonia: colonia,
            codigo_postal: codigo_postal,
            ciudad: ciudad,
            estado: estado,
            pais: pais
        }
        const id_direccion = await axiosInstance.post('/direcciones/', data)
        return id_direccion.data
    } catch (error) {
        return null
    }
}

export const updateDireccionById = async (direccion) => {
    try {
        const direccionData = {
            calle: direccion.calle,
            numero: direccion.numero,
            colonia: direccion.colonia,
            codigo_postal: direccion.codigo_postal,
            ciudad: direccion.ciudad,
            estado: direccion.estado,
            pais: direccion.pais
        }

        const { status } = await axiosInstance.put(`/direcciones/${direccion.id}`, direccionData)
        return status
    } catch (error) {
        return error.response.status
    }
}

export const deleteDireccionById = async (id) => {
    try {
        const { status } = await axiosInstance.delete(`/direcciones/${id}`)
        return status
    } catch (error) {
        return error.response.status
    }
}