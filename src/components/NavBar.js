import { useNavigate } from 'react-router-dom'
import '../styles/navbar.css'
import { useEffect } from 'react'
import { useMediaQuery } from '@uidotdev/usehooks'

export default function NavBar(props) {
    const navigate = useNavigate()

    const logo = 'logo_cgtham.png'
    const nombre = 'CGTHAM' || 'Comisión de Gestión de Talento Humano de las Altas Montañas'

    const isSmallDevice = useMediaQuery('(max-width:768px) or (max-width:1024px)');


    return (
        <div className="navbar">
            <div className="seccion1"
            >
                <div style={{ width: '50px', height: '50px' }}><img src={logo} alt="" /></div>

                <h1

                    onClick={() => { navigate('/') }}

                >{nombre}</h1>

            </div>
            <div className="seccion2">
                <ul>
                    {
                        !isSmallDevice && props?.opcionesNav && (
                            <li className='opciones'><a href='#inicio'>Inicio</a></li>
                        )
                    }
                    {
                        !isSmallDevice && props?.opcionesNav && (
                            <li className='opciones'><a href='#sectores'>Sectores</a></li>

                        )
                    }
                    {
                        !isSmallDevice && props?.opcionesNav && (
                            <li className='opciones'><a href='#impacto'>Impacto</a></li>

                        )
                    }
                    {
                        !isSmallDevice && props?.opcionesNav && (
                            <li className='opciones'><a href='#noticias'>Noticias</a></li>

                        )
                    }

                    {
                        !isSmallDevice && props?.opcionesNav && (
                            <li className='opciones'><a href='#funcionamiento'>Funcionamiento</a></li>

                        )
                    }
                    {
                        !isSmallDevice && props?.opcionesNav && (
                            <li className='opciones'><a href='#historias'>Comunidad</a></li>

                        )
                    }
                    {
                        !isSmallDevice && props?.opcionesNav && (
                            <li className='opciones'><a href='#contacto'>Contacto</a></li>

                        )
                    }

                    {
                        props?.opcionesNav && (
                            <li>
                                <button
                                    className='btn-accion'
                                    style={{ width: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }}
                                    onClick={(e) => { navigate('/login') }}

                                >
                                    LOGIN
                                </button>
                            </li>

                        )
                    }
                </ul>
            </div>
        </div>
    )
}