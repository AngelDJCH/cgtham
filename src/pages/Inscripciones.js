import { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";
import { findAllInscripciones } from "../services/Inscripcion";
import { useAuth } from "../hooks/useAuth";
import Paginacion from "../components/Paginacion";

export default function Inscripciones() {
    const { user } = useAuth()
    const [inscripcionesOrganizacion, setInscripcionesOrganizacion] = useState([])
    const [filtro, setFiltro] = useState('')

    const [limit, setLimit] = useState(20)
    const [offset, setOffset] = useState(0)

    const inscripciones = async (limit, offset) => {
        const res = await findAllInscripciones(user.organizacion, limit, offset)
        setInscripcionesOrganizacion(res)
    }

    // useEffect(() => {
    //     inscripciones(limit, offset)
    // }, [])

    useEffect(() => {
        inscripciones(limit, offset)
    }, [offset])
    return (
        <div>
            <NavBarAutenticado />
            <Filtros titulo='Inscripciones' placeholder='Buscar por nombre' opciones={['Mas recientes', 'Menos recientes']} filtro={setFiltro} />
            <TablaContenido encabezados={['Organización', 'Evento', 'Fecha', 'Estado', 'Acciones']} inscripcionesTabla={inscripcionesOrganizacion} filtro={filtro} />
            <Paginacion offset={offset} setOffset={setOffset} />
        </div>
    )
}