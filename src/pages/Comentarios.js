import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";

export default function Comentarios() {
    return (
        <div>
            <NavBarAutenticado />
            <Filtros titulo='Comentarios' placeholder='Buscar por nombre' opciones={['Mas recientes','Menos recientes']} accion='Crear comentario'/>
            <TablaContenido encabezados={['Usuario','Contenido','Acciones']}/>
        </div>
    )
}