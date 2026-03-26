import axios from "axios";

export const getComentarios = async () => {
    try {
        const {data} = await axios('')
        console.log(data)
        return data
    } catch (error) {
        
    }
}