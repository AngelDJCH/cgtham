import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";
import {findAllInscripciones } from "../services/Inscripcion";
import { useAuth } from "../hooks/useAuth";

export default function Inscripciones() {
    const { user } = useAuth()
    const [inscripcionesOrganizacion, setInscripcionesOrganizacion] = useState([])
    const [filtro, setFiltro] = useState('')
    useEffect(() => {
        const inscripciones = async () => {
            const res = await findAllInscripciones(user.organizacion)
            setInscripcionesOrganizacion(res)
        }
        inscripciones()
    }, [])
    return (
        <div>
            <NavBarAutenticado />
            <Filtros titulo='Inscripciones' placeholder='Buscar por nombre' opciones={['Mas recientes', 'Menos recientes']} filtro={setFiltro} />
            <TablaContenido encabezados={['Organización', 'Evento', 'Fecha', 'Estado', 'Acciones']} inscripcionesTabla={inscripcionesOrganizacion} filtro={filtro} />
        </div>
    )
}