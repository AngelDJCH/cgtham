import { axiosInstance } from "./Axios"

export const findAllByIdEscuela = async (id_escuela) => {
    try {
        const {data} = await axiosInstance.get(`/ofertaseducativas/${id_escuela}`)
        return data
    } catch (error) {
        console.log(error)
    }
}