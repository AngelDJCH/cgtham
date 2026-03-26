import { axiosInstance } from "./Axios.js"

export const login = async (correo, contraseña) => {

    const data = {
        correo: correo,
        contrasenia: contraseña
    }

    const respuesta = axiosInstance.post('/cuentas/login', data)

    console.log(respuesta)
    return respuesta
}

//ogin('carlos@gmail.com', 'carloscras15')