import { axiosInstance } from "./Axios"

export const findAllMensajesChat = async (id_emisor, id_receptor) => {
    try {
        const {data} = await axiosInstance.post('/mensajes/chat', {
            id_emisor : id_emisor,
            id_receptor : id_receptor
        })
        return data
    } catch (error) {
        console.log(error)
    }
}