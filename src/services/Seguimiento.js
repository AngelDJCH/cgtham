import {axiosInstance} from './Axios.js'

export const getSeguidores = async (id_usuario) => {
    try {
        const {data} = await axiosInstance.get(`/seguimientos/seguidores/${id_usuario}`)
        return data
    } catch (error) {
        console.log(error)
    }
}