import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";

export default function Inscripciones() {
    return (
        <div>
            <NavBarAutenticado />
            <Filtros titulo='Inscripciones' placeholder='Buscar por nombre' opciones={['Mas recientes','Menos recientes']}/>
            <TablaContenido encabezados={['Usuario', 'Evento','Fecha','Estado','Acciones']} contenido={[]}/>
        </div>
    )
}