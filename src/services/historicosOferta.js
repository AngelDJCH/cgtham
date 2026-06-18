import { axiosInstance } from "./Axios"

export const findAllHistoricosOferta = async () => {
    try {
        const {data} = await axiosInstance.get('/historicosofertaslaborales/')
        return data
    } catch (error) {
        alert('OCURRIO UN ERROR AL OBTENER LOS HISTORICOS DE LAS OFERTAS LABORALES')
    }
}