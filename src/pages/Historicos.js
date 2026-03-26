import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";

export default function Historicos() {
    return (
        <div>
            <NavBarAutenticado />
            <Filtros titulo='Historicos' placeholder='Buscar por organizacion' opciones={['Mas recientes','Menos recientes']} accion='Crear historico'/>
        </div>
    )
}