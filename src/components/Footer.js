import { useState } from 'react'
import '../styles/footer.css'
import PoliticaPrivacidad from './PoliticaPrivacidad'
import Terminos from './Terminos'
import Accesibilidad from './Accesibilidad'
import Mision from './Mision'
import Vision from './Vision'

export default function Footer() {
    const logo = 'logo_cgtham.png'

    const [openPolitica, setOpenPolitica] = useState(false)
    const [openTerminos, setOpenTerminos] = useState(false)
    const [openAccesibilidad, setOpenAccesibilidad] = useState(false)
    const [openMision, setOpenMision] = useState(false)
    const [openVision, setOpenVision] = useState(false)

    return (
        <div className='footer' id='contacto'>
            <div className='f-contenedor-seccion'>
                <div className='f-contenedor-logo-titulo'>
                    <img src={logo} alt='logo' />
                    <h6>CGTHAM</h6>
                </div>
                <div className='f-contenedor-informacion'>
                    <p>
                        Comisión de Gestión de Talento Humano de las Altas Montañas
                    </p>
                </div>
                <div className='f-contenedor-lista-h'>
                    <ul>
                        <li
                            style={{cursor:'pointer'}}
                            onClick={(e) => {
                                setOpenPolitica(true);
                            }}

                        >Politica de Privacidad</li>
                        <li
                            style={{cursor:'pointer'}}
                            onClick={(e) => {
                                setOpenTerminos(true);
                            }}

                        >Términos de Uso</li>
                        <li
                            style={{cursor:'pointer'}}
                            onClick={(e) => {
                                setOpenAccesibilidad(true)
                            }}

                        >Accesibilidad</li>
                    </ul>
                </div>
            </div>

            <div className='f-contenedor-seccion f-contenedor-lista-h'>
                <div className='f-subtitulo'>
                    <h6>Sectores</h6>
                </div>
                <ul>
                    <li>Industria y Manufactura</li>
                    <li>Logística, Transporte y Distribución</li>
                    <li>Comercio y Servicios al Cliente</li>
                    <li>Comunicación, Medios y Publicidad</li>
                    <li>Educación y Formación Técnica</li>
                    <li>Gestión Empresarial y Vinculación</li>
                </ul>
            </div>

            <div className='f-contenedor-seccion f-contenedor-lista-h'>
                <div className='f-subtitulo'>
                    <h6>Objetivos</h6>
                </div>
                <ul>
                    <li
                    style={{cursor:'pointer'}}
                    onClick={()=>{
                        setOpenMision(true)
                    }}

                    >Misión</li>
                    <li
                    style={{cursor:'pointer'}}
                    onClick={()=>{
                        setOpenVision(true)
                    }}

                    >Visión</li>
                </ul>
            </div>

            <div className='f-contenedor-seccion f-contenedor-lista-h'>
                <div className='f-subtitulo'>
                    <h6>Contacto</h6>
                </div>
                <ul>
                    <li>Correo: cgtham@gmail.com</li>
                    <li>Ubicación: Orizaba Ver</li>
                    <li>Teléfono: 2729011021</li>
                </ul>
            </div>


            {
                openPolitica && (
                    <PoliticaPrivacidad accion={setOpenPolitica}/>
                )
            }

            {
                openTerminos && (
                    <Terminos accion={setOpenTerminos}/>
                )
            }

            {
                openAccesibilidad && (
                    <Accesibilidad accion={setOpenAccesibilidad}/>
                )
            }

            {
                openMision && (
                    <Mision accion={setOpenMision}/>
                )
            }

            {
                openVision && (
                    <Vision accion={setOpenVision}/>
                )
            }
        </div>
    )
}