import axios from "axios";
import { axiosInstance } from "./Axios";

export const getEventosCounts = async () => {
    const {data} = await axiosInstance.get('/eventos/count')
    return data.eventos
}

export const getEventos = async () => {
    const {data} = await axiosInstance.get('/eventos/')
    return data
}