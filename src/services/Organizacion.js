import {axiosInstance} from './Axios.js'

export const getOrganizacionesCounts = async () => {
    const {data} = await axiosInstance.get('/organizaciones/count');
    return data.organizaciones;
}