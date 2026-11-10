import { axiosInstance } from "./Axios"

export const createAfiliacion = async (empresa, camara) => {
    try {
        const { status } = await axiosInstance.post('/afiliaciones/', { id_empresa: empresa, id_camara: camara })
        return status
    } catch (error) {
        console.error('Error al afiliar a la empresa:', error)
        return null
    }
}

export const findByIdEmpresa = async (id_empresa) => {
    try {
        const { data } = await axiosInstance.get(`/afiliaciones/${id_empresa}`)
        return data
    } catch (error) {
        console.error('Error al obtener afiliaciones por empresa:', error)
        return []
    }
}