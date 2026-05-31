import { axiosInstance } from "./Axios"
import { createContacto } from "./Contacto"
import { createCuenta } from "./Cuenta"
import { createDireccion } from "./Direccion"

export const getUsersCounts = async () => {
        const { data } = await axiosInstance.get('/usuarios/count')
        console.log('Consulta a usuarios -> /api/v1/usuarios/count')
        return data.usuarios
}

export const getPefil = async (id_usuario) => {
        try {
                const {data} = await axiosInstance.get(`/usuarios/perfil/${id_usuario}`)
                return data
        } catch (error) {
                console.log(error)
        }
}

export const createUsuario = async (banner, contacto, foto, id_organizacion, personales, seguridad, ubicacion) => {
        try {
                const id_direccion =  await createDireccion(ubicacion.calle, ubicacion.numero, ubicacion.colonia, ubicacion.codigo_postal, ubicacion.ciudad, ubicacion.estado, ubicacion.pais)
                const id_contacto =  await createContacto(contacto.correo, contacto.telefono)
                console.log(`El id_direccion es: ${id_direccion.id} y el id_contacto es : ${id_contacto.id}`)
                const data = {
                        nombre : personales.nombre,
                        apellido_paterno : personales.apellido_paterno,
                        apellido_materno : personales.apellido_materno,
                        rfc : personales.rfc,
                        foto : 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        banner : 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=886&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        estado : true,
                        id_direccion : id_direccion.id,
                        id_contacto : id_contacto.id,
                        id_organizacion : id_organizacion
                }

                const id_usuario = await axiosInstance.post('/usuarios/', data)
                console.log('El id del usuario es: ',id_usuario.data.id)
                const resCuenta = await createCuenta(contacto.correo, seguridad.contrasenia, ['USER'], id_usuario.data.id)
                if(!resCuenta.status === 201) throw new Error('No se pudo crear la cuenta del usuario')
                return resCuenta.data
        } catch (error) {
                
        }
}