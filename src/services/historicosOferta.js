import { axiosInstance } from "./Axios"

export const findAllHistoricosOferta = async () => {
    try {
        const {data} = await axiosInstance.get('/historicosofertaslaborales/')
        return data
    } catch (error) {
        console.log(error)
    }
}