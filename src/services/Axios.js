import axios from "axios"

export const axiosInstance = axios.create(
    {
        baseURL :  'http://localhost:80/api/v1', //process.env.REACT_APP_URL_RUTA_API ||
        withCredentials: true
    }
)