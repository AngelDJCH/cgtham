import { axiosInstance } from "./Axios"

export const getEmpresa = async (id_empresa) => {
    try {
        const { data } = await axiosInstance.get(`/empresas/${id_empresa}`)
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LA EMPRESA')
    }
}

export const createEmpresa = async (id_organizacion, razon_social, regimen_fiscal, direccion_fiscal) => {
    try {
        const { data } = await axiosInstance.post(`/empresas/`, {
            id_organizacion: id_organizacion,
            razon_social: razon_social,
            regimen_fiscal: regimen_fiscal,
            direccion_fiscal: direccion_fiscal
        })
        return data
    } catch (error) {
        return null
    }
}

export const updateEmpresaById = async (empresa) => {
    try {
        const empresaData = {
            razon_social: empresa.razon_social,
            regimen_fiscal: empresa.regimen_fiscal,
            direccion_fiscal: empresa.direccion_fiscal
        }

        const { status } = await axiosInstance.put(`/empresas/${empresa.id}`, empresaData)
        return status
    } catch (error) {
        return error.response.status
    }
}