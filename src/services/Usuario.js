import { axiosInstance } from "./Axios"

export const getUsersCounts = async () => {
        const {data} = await axiosInstance.get('/usuarios/count')
        console.log('Consulta a usuarios -> /api/v1/usuarios/count')
        return data.usuarios
}
