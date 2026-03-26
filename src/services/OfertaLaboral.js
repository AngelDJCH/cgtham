import {axiosInstance} from './Axios.js'

export const getOfertasCounts = async () => {
    const {data} = await axiosInstance.get('/ofertaslaborales/count')
    return data.empleos
}