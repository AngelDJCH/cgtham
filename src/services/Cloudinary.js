import { axiosInstance } from "./Axios"

export const getCloudDinary = async (id_organizacion) => {
    try {
        const {data} = await axiosInstance(`/cloudinaryConfigs/${id_organizacion}`)
        return data
    } catch (error) {
        console.log(error)        
    }
}

export const createCloudinary = async (nombre, clave, clave_secreta, id_organizacion) => {
    try {
        const {data} = await axiosInstance.post(`/cloudinaryConfigs/`,{
            nombre : nombre,
            clave : clave,
            clave_secreta : clave_secreta,
            id_organizacion : id_organizacion
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateCloudinaryByIdOrganizacion = async (cloudinary) => {
    try {
        const cloudData = {
            nombre : cloudinary.nombre,
            clave : cloudinary.clave,
            clave_secreta : cloudinary.clave_secreta
        }
        const {status} = await axiosInstance.put(`/cloudinaryConfigs/${cloudinary.id_organizacion}`, cloudData)
        return status
    } catch (error) {
        console.log(error)
    }
}