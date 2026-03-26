import Aliados from "../components/Aliados";
import Cta from "../components/Cta";
import Footer from "../components/Footer";
import Funcionamiento from "../components/Funcionamiento";
import Hero from "../components/Hero";
import Historias from "../components/Historias";
import Impacto from "../components/Impacto";
import NavBar from "../components/NavBar";
import Noticias from "../components/Noticias";
import Sectores from "../components/Sectores";

export default function LandingPage(){
    return(
        <div>
            <NavBar opcionesNav={true}/>
            <Hero/>
            <Aliados/>
            <Sectores/>
            <Impacto/>
            <Noticias/>
            <Funcionamiento/>
            <Historias/>
            <Cta/>
            <Footer/>
        </div>
    )
}