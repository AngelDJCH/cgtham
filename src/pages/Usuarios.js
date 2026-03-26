import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";

export default function Usuarios() {
    return (
        <div>
            <NavBarAutenticado />
            <Filtros titulo='Usuarios' placeholder='Buscar por nombre' opciones={['Mas recientes','Menos recientes']} accion='Crear usuario'/>
        </div>
    )
}