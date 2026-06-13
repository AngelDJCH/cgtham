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

// export const createMessage = async (contenido, id_emisor, id_receptor, id_chat) => {
//     try {
//         const {status} = await axiosInstance.post('/mensajes/chat', {
//             contenido : contenido,
//             id_emisor : id_emisor,
//             id_receptor : id_receptor,
//             id_chat : id_chat  
//         })
//         return status
//     } catch (error) {
//         console.log(error)
//     }
// }