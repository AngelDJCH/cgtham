import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";
import { findAllComentariosByAdministrador, findAllComentariosByUsuario } from "../services/Comentario";
import AlertaComentario from "../components/AlertaComentario";
import { useAuth } from "../hooks/useAuth";
import Paginacion from "../components/Paginacion";

export default function Comentarios() {
    const { user } = useAuth()
    const [comentariosAdministracion, setComentariosAdministracion] = useState([])
    const [comentariosUsuario, setComentariosUsuario] = useState([])
    const [alerta, setAlerta] = useState(false)
    const [limit, setLimit] = useState(20)
    const [offset, setOffset] = useState(0)
    useEffect(() => {
        const administrador = async (limit, offset) => {
            const res = await findAllComentariosByAdministrador(limit, offset)
            setComentariosAdministracion(res)
        }
        const usuario = async (limit, offset) => {
            const res = await findAllComentariosByUsuario(user.organizacion,limit, offset)
            setComentariosUsuario(res)
        }
        user.rol.includes('ADMIN_ORG') ? usuario(limit, offset) : administrador(limit, offset)
    }, [offset])
    return (
        <div>
            <NavBarAutenticado />
            <Filtros enableAccion={user.rol.includes('ADMIN_ORG') ? true : false} titulo='Comentarios' placeholder='Buscar por estado' opciones={['Mas recientes', 'Menos recientes']} accion='CREAR' btn_accion={setAlerta} />
            <TablaContenido encabezados={user.rol.includes('ADMIN_ORG') ? ['Contenido', 'Fecha', 'Estado', 'Acciones'] : ['Organización', 'Contenido', 'Fecha', 'Estado', 'Acciones']} comentariosTabla={user.rol.includes('ADMIN_ORG') ? comentariosUsuario : comentariosAdministracion} tipo={user.rol.includes('ADMIN_ORG') ? 'ORG' : 'SYS'} />
            <Paginacion offset={offset} setOffset={setOffset}/>
            {
                alerta && (
                    <AlertaComentario btn_accion={setAlerta} />
                )
            }
        </div>
    )
}