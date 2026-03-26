import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";
import TablaContenido from "../components/Tabla-contenido";

export default function Convenios() {
    return (
        <div>
            <NavBarAutenticado />
            <Filtros titulo='Convenios' placeholder='Buscar por nombre' opciones={['Mas recientes','Menos recientes']} accion='Crear convenio'/>
            <TablaContenido encabezados={['Titulo','Tipo','Descripcion','Anfitrion','Participantes','Acciones']}/>
        </div>
    )
}