import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";

export default function Postulaciones() {
    return (
        <div>
            <NavBarAutenticado />
            <Filtros titulo='Postulaciones' placeholder='Buscar por nombre' opciones={['Mas recientes', 'Menos recientes']} accion='Crear postulacion' />
            <TablaContenido encabezados={['Titulo', 'Organizacion', 'Estado', 'Fecha', 'Acciones']} contenido={[]} />

        </div>
    )
}