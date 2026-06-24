import axios from "axios"

export const axiosInstance = axios.create(
    {
        //http://localhost:80/api/v1
        //https://api-cgtham.onrender.com/api/v1
        baseURL :  'http://localhost:80/api/v1' , 
        withCredentials: true
    }
)