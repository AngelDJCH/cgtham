import axios from "axios"

export const axiosInstance = axios.create(
    {
        baseURL : 'https://api-cgtham.onrender.com/api/v1' , //'http://localhost:80/api/v1', //https://api-cgtham.onrender.com/api/v1
        withCredentials: true
    }
)