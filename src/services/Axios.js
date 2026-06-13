import axios from "axios"

export const axiosInstance = axios.create(
    {
        baseURL :  'process.env.REACT_APP_URL_RUTA_API' , //'http://localhost:80/api/v1', //
        withCredentials: true
    }
)