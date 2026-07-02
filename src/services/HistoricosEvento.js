import { axiosInstance } from "./Axios"

export const findAllHistoricosEventos = async () => {
    try {
        const { data } = await axiosInstance.get('/historicoseventos/')
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LOS HISTORICOS DE EVENTOS')
    }
}