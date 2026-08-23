import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";
import { findAllComentariosByAdministrador, findAllComentariosByUsuario } from "../services/Comentario";
import AlertaComentario from "../components/AlertaComentario";
import { useAuth } from "../hooks/useAuth";

export default function Comentarios() {

    const { user } = useAuth()

    const [comentariosAdministracion, setComentariosAdministracion] = useState([])

    const [comentariosUsuario, setComentariosUsuario] = useState([])

    const [alerta, setAlerta] = useState(false)

    const [filtro, setFiltro] = useState('')

    useEffect(() => {
        const administrador = async () => {
            const res = await findAllComentariosByAdministrador()
            setComentariosAdministracion(res)
        }

        const usuario = async () => {
            const res = await findAllComentariosByUsuario(user.organizacion)
            setComentariosUsuario(res)
        }

        user.rol.includes('ADMIN_ORG') ? usuario() : administrador()
    }, [])

    return (
        <div>
            <NavBarAutenticado />
            <Filtros enableAccion={user.rol.includes('ADMIN_ORG') ? true : false} titulo='Comentarios' placeholder='Buscar por estado' opciones={['Mas recientes', 'Menos recientes']} accion='CREAR' btn_accion={setAlerta} />
            <TablaContenido encabezados={user.rol.includes('ADMIN_ORG') ? ['Contenido', 'Fecha', 'Estado', 'Acciones'] : ['Organización', 'Contenido', 'Fecha', 'Estado', 'Acciones']} comentariosTabla={user.rol.includes('ADMIN_ORG') ? comentariosUsuario : comentariosAdministracion} tipo={user.rol.includes('ADMIN_ORG') ? 'ORG' : 'SYS'} />
            {
                alerta && (
                    <AlertaComentario btn_accion={setAlerta} />
                )
            }
        </div>
    )
}