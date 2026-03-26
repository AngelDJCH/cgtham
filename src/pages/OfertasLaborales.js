import Filtros from "../components/Filtros";
import NavBarAutenticado from "../components/NavBarAutenticado";

export default function OfertasLaborales() {
    return (
        <div>
            <NavBarAutenticado />
            <Filtros titulo='Ofertas Laborales' placeholder='Buscar por nombre' opciones={['Mas recientes','Menos recientes']} accion='Crear oferta laboral'/>
        </div>
    )
}