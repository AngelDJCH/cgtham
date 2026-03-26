import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";

export default function Organizaciones() {
    return (
        <div>
            <NavBarAutenticado />
            <Filtros titulo='Organizaciones' placeholder='Buscar por nombre' opciones={['Mas recientes','Menos recientes']} accion='Crear organizacion'/>
        </div>
    )
}