import { axiosInstance } from "./Axios";

export const getConveniosCounts = async () => {
    const {data} = await axiosInstance.get('/convenios/count')
    return data.convenios;
}