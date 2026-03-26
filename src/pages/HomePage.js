import AccionRapida from "../components/AccionRapida";
import ListaUsuarios from "../components/ListaUsuarios";
import NavBarAutenticado from "../components/NavBarAutenticado";
import NavUser from "../components/NavUser";
import Notas from "../components/Notas";
import '../styles/home.css'

export default function HomePage() {
    return (
        <div className="home">
            <NavBarAutenticado />
            <div>
                <ListaUsuarios />
                <NavUser left='30px' />
                <Notas />
            </div>
        </div>
    )
}